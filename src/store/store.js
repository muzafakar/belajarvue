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

    tvKabelIndex: null,
    viewedTvKabel: null,

    viewTvKabel: null,
    viewIndex: null
  },

  mutations: {
    /*******************************/
    // authentication mutation     //
    /*******************************/
    async logoutProcedure(state) {
      // delete all session key-value here
      // set state to null or false
      try {
        await firebase.auth.signOut()
        localStorage.removeItem('user')
        router.push('/login')
      } catch (error) {
        console.log('error on sign out, reason: ' + error);

      }
    },

    cleanLogout({ commit }) {
      localStorage.removeItem('vuex')
      commit('logoutProcedure')
    },

    loginProcedure(state, user) {
      /* save all session key-value here
       set state to any or true*/
      localStorage.setItem('user', JSON.stringify(user))
      if (state.owner.length == 0) {
        this.dispatch('fetchOwner') // check wheter we already have owner on localStorage or not
      }

      if (state.tvkabel.length == 0) {
        this.dispatch('fetchInstance')
      }

      router.push('/dashboard/main')
    },

    /*******************************/
    // owner mutation              //
    /*******************************/
    pushOwner(state, obj) {
      state.owner.push(obj)
    },

    resetOwner(state) {
      state.owner = []
    },

    removeOwner(state, index) {
      state.owner.splice(index, 1)
    },

    /*******************************/
    // tv kabel mutation           //
    /*******************************/
    pushTvKabel(state, obj) {
      state.tvkabel.push(obj)
    },

    replaceTvKabel(state, obj) {
      state.tvkabel.splice(state.tvKabelIndex, 0, obj) // (index, elementCount, obj)
    },

    resetTvKabel(state) {
      state.tvkabel = []
    },

    removeTvKabel(state, index) {
      state.tvkabel.splice(index, 1)
    },

    /*******************************/
    // cache insert mutation       //
    /*******************************/
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
    },

    cacheTvKabelIndex(state, index) {
      state.tvKabelIndex = index
    },

    cacheViewedTvKabel(state, tvkabel) {
      state.viewedTvKabel = tvkabel
    },


    /*******************************/
    // cache view tvkabel mutation //
    /*******************************/
    cacheViewTvKabel(state, obj) {
      state.viewTvKabel = obj
    },
    cacheViewIndex(state, index) {
      state.viewIndex = index
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

      const dusunNames = []
      const dusunIds = []
      try {
        // 1
        window.getApp.$emit('FIREBASE_ADD_ONE_DOCUMENT', 'tv kabel information')
        const newTvKabel = await firebase.cTvKabel.add(tvKabelData)
        const tvKabelSubCol = firebase.cTvKabel.doc(newTvKabel.id) // reusable for remaining steps
        tvKabelData.id = newTvKabel.id

        // 2 adding the dusuns
        const dusunArray = []
        for (let d = 0; d < dusuns.length; d++) {
          const dusun = {
            name: dusuns[d][0],
            timestamp: new Date()
          }
          let newDusun = await tvKabelSubCol.collection('dusun').add(dusun)
          window.getApp.$emit('FIREBASE_ADD_ONE_DOCUMENT', 'dusun ' + (d + 1) + ' of ' + dusuns.length)

          dusun['id'] = newDusun.id //set id ke object dusun baru
          dusunNames.push(dusun.name) // simpan nama dusun untuk worker dan customer
          dusunIds.push(newDusun.id) // simpan id dusun untuk worker dan customer
          dusunArray.push(dusun) // simpan object dusun ke dusunArray
          console.log(JSON.stringify(dusun));
        }
        tvKabelData['dusun'] = dusunArray //simpan object dusunArray ke dalam object tvKabelData


        // 3 adding the workers
        const workerArray = []
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

          let newWorker = await tvKabelSubCol.collection('worker').add(worker)
          worker['id'] = newWorker.id
          workerArray.push(worker)
          window.getApp.$emit('FIREBASE_ADD_ONE_DOCUMENT', 'worker ' + (w + 1) + ' of ' + workers.length)
        }
        tvKabelData['worker'] = workerArray

        // 4 adding the customers
        const customerArray = []
        for (let c = 0; c < customers.length; c++) {
          let indexId = dusunNames.indexOf(customers[c][2])
          let dusun = { id: dusunIds[indexId], name: dusunNames[indexId] }
          const customer = {
            name: customers[c][0],
            phone: customers[c][1],
            dusun: dusun,
            timestamp: new Date()
          }
          let newCustomer = await tvKabelSubCol.collection('customer').add(customer)
          customer['id'] = newCustomer.id
          customerArray.push(customer)
          window.getApp.$emit('FIREBASE_ADD_ONE_DOCUMENT', 'customer ' + (c + 1) + ' of ' + customers.length)
        }
        tvKabelData['customer'] = customerArray

        commit('pushTvKabel', tvKabelData)
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

    async fetchInstance({ commit }) {
      commit('resetTvKabel')
      console.log('fetching tv kabel data');
      try {
        const instance = await firebase.cTvKabel.get()
        instance.forEach(doc => {
          let tvk = doc.data()
          tvk.id = doc.id
          commit('pushTvKabel', tvk)
        })
      } catch (error) {
        console.log(error);
        window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: 'error on fetching tv kabel data, reason: ' + error, color: 'error' })
      }
    },

    async fetchDusun({ commit, state }) {
      try {
        const viewTvKabel = state.viewTvKabel
        const dusuns = await firebase.cTvKabel.doc(viewTvKabel.id).collection('dusun').get()
        const dusunArr = []
        dusuns.forEach(doc => {
          let d = doc.data()
          d.id = doc.id
          dusunArr.push(d)
        })
        viewTvKabel.dusun = dusunArr
        commit('cacheViewTvKabel', viewTvKabel)
        // TODO splice tvkabel array with new obj
        console.log(viewTvKabel.dusun);
      } catch (error) {
        window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: 'error fetching dusun data, reason: ' + error, color: 'error' })
        console.log('error fetching dusun data, reason: ' + error);
      }
    },
    async fetchWorker({ commit, state }, instanceId) {

    },
    async fetchCustomer({ commit, state }, instanceId) {

    }
  }

})
