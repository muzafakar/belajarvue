import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/router';
import createPersistedState from 'vuex-persistedstate'
const firebase = require('../plugins/firebase')

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    owner: [],
    tvkabel: [],
    tDusun: [],
    tCustomer: [],
    tWorker: [],
  },

  mutations: {
    logoutProcedure(state) {
      // delete all session key-value here
      // set state to null or false
      localStorage.removeItem('user')
      router.push('/login')
    },

    loginProcedure(state, user) {
      // save all session key-value here
      // set state to any or true
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/dashboard/main')
      if (state.owner.length == 0) {
        this.dispatch('fetchOwner') // check wheter we already have owner on localStorage or not
      }
    },

    pushOwner(state, obj) {
      state.owner.push(obj)
    },

    resetOwner(state) {
      state.owner = []
    },

    removeOwner(state, index) {
      state.owner.splice(index, 1)
    },

    pushTvKabel(state, obj) {
      state.tvkabel.push(obj)
    },

    resetTvKabel(state) {
      state.tvkabel = []
    },

    removeTvKabel(state, index) {
      state.tvkabel.splice(index, 1)
    },

    cacheDusun(state, dusunArr) {
      state.tDusun = dusunArr
      window.getApp.$emit('CACHE_SUCCESS')

    },

    cacheCustomer(state, customerArr) {
      state.tCustomer = customerArr
      window.getApp.$emit('CACHE_SUCCESS')
    },

    cacheWorker(state, workerArr) {
      state.tWorker = workerArr
      window.getApp.$emit('CACHE_SUCCESS')
    }
  },

  actions: {
    async userLogin({ commit }, user) {
      var msg = ''
      var color = ''
      try {
        const auth = await firebase.login(user)
        commit('loginProcedure', auth.user)
        msg = "Assalamu'alaikum, " + auth.user.email + " :)"
        color = 'success'
      } catch (error) {
        console.log("login error")
        msg = "Login Failed, check email and password!"
        color = 'error'
      }
      window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: msg, color: color })
    },

    userLogout({ commit }) {
      commit('logoutProcedure')
      window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: "Loged Out", color: 'info' })
    },

    async fetchOwner({ commit }) {
      console.log('fetching remote data')
      commit('resetOwner')
      try {
        const owners = await firebase.cOwner.get()
        let arr = []
        owners.forEach(doc => {
          let obj = doc.data()
          obj.id = doc.id
          arr.push(obj)
          commit('pushOwner', obj)
        })
      } catch (error) {
        console.log(error)
      }
      window.getApp.$emit('TOGGLE_TABLE_LOADING')
    },

    async addNewOwner({ commit }, newOwner) {
      var msg = ""
      var color = ""
      try {
        const createdOwner = await firebase.cOwner.add(newOwner)
        let owner = newOwner
        owner.id = createdOwner.id
        commit('pushOwner', owner)
        msg = newOwner.name + ' added as owner'
        color = 'success'
      } catch (error) {
        msg = 'Error occured while adding owner, reason: \n' + error
        color = 'error'
        console.log(error)
      }
      window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: msg, color: color })
      window.getApp.$emit('TOGGLE_PROGRESS_DIALOG')
    },

    async addNewInstance({ dispatch, commit, state }, tvKabelData) {
      var snackbarMsg = ''
      var snackbarClr = ''
      const dusuns = state.tDusun
      const workers = state.tWorker
      const customers = state.tCustomer
      const tvKabelArr = state.tvkabel

      // const dusunNames = []
      // const dusunIds = []
      try {
        // 1
        window.getApp.$emit('FIREBASE_ADD_ONE_DOCUMENT', 'tv kabel information')
        const newTvKabel = await firebase.cTvKabel.add(tvKabelData)
        const tvKabelSubCol = firebase.cTvKabel.doc(newTvKabel.id) // reusable for remaining steps
        tvKabelData.id = newTvKabel.id
        tvKabelArr.push(tvKabelData)
        commit('saveTvKabel', [])
        commit('saveTvKabel', tvKabelArr)

        // 2 adding the dusuns
        for (let d = 0; d < dusuns.length; d++) {
          const dusun = {
            name: dusuns[d][0],
            timestamp: new Date()
          }
          let newDusun = await tvKabelSubCol.collection('dusun').add(dusun)
          window.getApp.$emit('FIREBASE_ADD_ONE_DOCUMENT', 'dusun ' + (d + 1) + ' of ' + dusuns.length)
          dusunNames.push(dusuns[d][0])
          dusunIds.push(newDusun.id)
          console.log(JSON.stringify(dusun));
        }

        // 3 adding the workers
        for (let w = 0; w < workers.length; w++) {
          const areas = []
          for (let a = 2; a < workers[w].length; a++) {
            if (workers[w][a] !== null) {
              let indexId = dusunNames.indexOf(workers[w][a])
              areas.push({ id: dusunIds[indexId], name: dusunNames[indexId] })
            }
          }

          const worker = {
            name: workers[w][0],
            phone: workers[w][1],
            area: areas,
            timestamp: new Date()
          }

          await tvKabelSubCol.collection('worker').add(worker)
          window.getApp.$emit('FIREBASE_ADD_ONE_DOCUMENT', 'worker ' + (w + 1) + ' of ' + workers.length)
        }

        // 4 adding the customers
        for (let c = 0; c < customers.length; c++) {
          let indexId = dusunNames.indexOf(customers[c][2])
          let dusun = { id: dusunIds[indexId], name: dusunNames[indexId] }
          const customer = {
            name: customers[c][0],
            phone: customers[c][1],
            dusun: dusun,
            timestamp: new Date()
          }
          await tvKabelSubCol.collection('customer').add(customer)
          window.getApp.$emit('FIREBASE_ADD_ONE_DOCUMENT', 'customer ' + (c + 1) + ' of ' + customers.length)
        }

        snackbarMsg = tvKabelData.name + ' added with ' + dusuns.length + " dusun, " + workers.length + ' worker, ' + customers.length + ' customers.'
        snackbarClr = 'success'
      } catch (error) {
        snackbarMsg = 'Error occured while creating tv kabel, reason: \n' + error
        snackbarClr = 'error'
        console.log(error);
      }

      commit('cacheDusun', [])
      commit('cacheWorker', [])
      commit('cacheCustomer', [])
      window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: snackbarMsg, color: snackbarClr })
      window.getApp.$emit('TOGGLE_PROGRESS_DIALOG')
    },
    // async insertDusun({ state, commit, dispatch }, ref) {
    //   try {
    //     const dusunNames = []
    //     const dusunIds = []
    //     for (let d = 0; d < dusuns.length; d++) {
    //       const dusun = {
    //         name: dusuns[d][0],
    //         timestamp: new Date()
    //       }
    //       let newDusun = await ref.collection('dusun').add(state.tDusun)
    //       window.getApp.$emit('FIREBASE_ADD_ONE_DOCUMENT', 'dusun ' + (d + 1) + ' of ' + dusuns.length)
    //       dusunNames.push(dusuns[d][0])
    //       dusunIds.push(newDusun.id)
    //       console.log(JSON.stringify(dusun));
    //     }
    //   } catch (error) {

    //   }
    //   dispatch('insertWorker', { ref: ref, dusunIds: dusunIds, dusunNames: dusunNames })
    //   commit('cacheDusun', [])
    // },

    // async insertWorker({ state, commit }, obj) { //{ref, dusunIds, dusunNames}
    //   for (let w = 0; w < state.tWorker.length; w++) {
    //     const areas = []
    //     for (let a = 2; a < state.tWorker[w].length; a++) {
    //       if (state.tWorker[w][a] !== null) {
    //         let indexId = obj.dusunNames.indexOf(state.tWorker[w][a])
    //         areas.push({ id: obj.dusunIds[indexId], name: obj.dusunNames[indexId] })
    //       }
    //     }

    //     const worker = {
    //       name: state.tWorker[w][0],
    //       phone: state.tWorker[w][1],
    //       area: areas,
    //       timestamp: new Date()
    //     }

    //     await obj.ref.collection('worker').add(worker)
    //     window.getApp.$emit('FIREBASE_ADD_ONE_DOCUMENT', 'worker ' + (w + 1) + ' of ' + workers.length)
    //   }

    //   commit('cacheWorker', [])
    // },

    // async insertCustomer({ state, commit }, obj) { //{ref, dusunIds, dusunNames}
    //   for (let c = 0; c < state.tCustomer.length; c++) {
    //     let indexId = obj.dusunNames.indexOf(state.tCustomer[c][2])
    //     let dusun = { id: obj.dusunIds[indexId], name: obj.dusunNames[indexId] }
    //     const customer = {
    //       name: state.tCustomer[c][0],
    //       phone: state.tCustomer[c][1],
    //       dusun: dusun,
    //       timestamp: new Date()
    //     }
    //     await obj.ref.collection('customer').add(customer)
    //     window.getApp.$emit('FIREBASE_ADD_ONE_DOCUMENT', 'customer ' + (c + 1) + ' of ' + state.tCustomer.length)
    //   }

    //   commit('cacheCustomer', [])
    // }
  }

})
