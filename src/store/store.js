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
    tDusun: [],
    tCustomer: [],
    tWorker: []
  },

  mutations: {
    saveOwner(state, val) {
      state.owner = val
    },
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
      router.push('/dashboard')
      if (state.owner.length == 0) {
        this.dispatch('fetchOwner') // check wheter we already have owner on localStorage or not
      }
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
      try {
        const auth = await firebase.login(user)
        commit('loginProcedure', auth.user)
        window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: "Assalamu'alaikum, " + auth.user.email + " :)", color: 'success' })
      } catch (error) {
        sessionStorage
        console.log("login error")
        window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: "Login Failed, check email and password!", color: 'error' })
      }
    },

    userLogout({ commit }) {
      commit('logoutProcedure')
      window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: "Loged Out", color: 'info' })
    },

    async fetchOwner({ commit }) {
      console.log('fetching remote data')
      commit('saveOwner', []) // Clearing the state
      try {
        const owners = await firebase.cOwner.get()
        let arr = []
        owners.forEach(doc => {
          let o = doc.data()
          o.id = doc.id
          arr.push(o)
        })
        commit('saveOwner', arr)
      } catch (error) {
        console.log(error)
      }
    },

    async addNewOwner({ commit, state }, newOwner) {
      var snackbarMsg = ""
      var snackbarClr = ""
      try {
        const owners = state.owner
        const createdOwner = await firebase.cOwner.add(newOwner)
        let owner = newOwner
        owner.id = createdOwner.id
        owners.push(owner)

        commit('saveOwner', [])
        commit('saveOwner', owners)
        snackbarMsg = newOwner.name + ' added as owner'
        snackbarClr = 'success'
      } catch (error) {
        snackbarMsg = 'Error occured while adding owner, reason: \n' + error
        snackbarClr = 'error'
        console.log(error)
      }
      window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: snackbarMsg, color: snackbarClr })
      window.getApp.$emit('TOGGLE_PROGRESS_DIALOG')
    },

    async addNewInstance({ dispatch, commit, state }, tvKabelData) {
      var snackbarMsg = ''
      var snackbarClr = ''
      const dusuns = state.tDusun
      const workers = state.tWorker
      const customers = state.tCustomer

      const dusunNames = []
      const dusunIds = []
      try {
        // 1
        window.getApp.$emit('FIREBASE_ADD_ONE_DOCUMENT', 'tv kabel information')
        const newTvKabel = await firebase.cTvKabel.add(tvKabelData)
        const tvKabelSubCol = firebase.cTvKabel.doc(newTvKabel.id) // reusable for remaining steps

        // 2 adding the dusuns
        for (let d = 0; d < dusuns.length; d++) {
          const dusun = {
            name: dusuns[d][0],
            timestamp: new Date()
          }
          const newDusun = await tvKabelSubCol.collection('dusun').add(dusun)
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
    }
  }
})
