import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/router';
import createPersistedState from 'vuex-persistedstate'
const firebase = require('../plugins/firebase')

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    viewInstance: null,
    dusunMap: null,
    tempDusun: [],
    tempWorker: [],
    tempCustomer: [],
  },
  mutations: {
    // AUTHENTICATION
    loginProcedure(state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/dashboard')
    },

    logoutProcedure() {
      localStorage.removeItem('user')
      router.push('/auth')
    },

    clearCache() {
      localStorage.clear()
    },

    // INPUT CACHE
    cacheDusun(state, dusunArr) {
      state.tempDusun = dusunArr
      window.getApp.$emit('EVENT_CACHE_SUCCESS')
    },
    cacheWorker(state, workerArr) {
      state.tempWorker = workerArr
      window.getApp.$emit('EVENT_CACHE_SUCCESS')
    },
    cacheCustomer(state, customerArr) {
      state.tempCustomer = customerArr
      window.getApp.$emit('EVENT_CACHE_SUCCESS')
    },
    clearCacheDusun(state) {
      state.tempDusun = []
    },
    clearCacheWorker(state) {
      state.tempWorker = []
    },
    clearCacheCustomer(state) {
      state.tempCustomer = []
    },

    // VIEW CACHE
    cacheInstance(state, obj) {
      state.viewInstance = obj
    },

    clearCacehInstance(state) {
      state.viewInstance = null
    },

    cacheViewDusun(state, obj) {
      state.dusunMap = obj
    },

    clearCacheViewDusun(state) {
      state.dusunMap = null
    }
  },
  actions: {
    showSnackbar({}, snackbar) {
      snackbar.show = true
      window.getApp.$emit('EVENT_SNACKBAR', snackbar)
    },

    // AUTHTENTICATION
    async login({
      dispatch,
      commit
    }, auth) {
      let snackbarMessage = ''
      let snackbarColor = ''
      try {
        const user = await firebase.auth.signInWithEmailAndPassword(auth.email, auth.password)
        snackbarMessage = "Assalamu'alaikum, " + user.user.email
        snackbarColor = 'success'
        commit('loginProcedure', user.user)
      } catch (error) {
        snackbarMessage = "error when login, reason: " + error
        snackbarColor = "error"
        console.log(error);
      }
      dispatch('showSnackbar', {
        message: snackbarMessage,
        color: snackbarColor
      })
    },

    logout({}) {
      commit('logoutProcedure')
    },

    clean_logout({}) {
      commit('clearCache')
      commit('logoutProcedure')
    },

    // Instance
    async createNewInstance({
      commit,
      state,
      dispatch
    }, instance) {
      const dusuns = state.tempDusun
      const workers = state.tempWorker
      const customers = state.tempCustomer

      const dusunMap = {}

      var snackbarMessage = ""
      var snackbarColor = ""
      try {
        window.getApp.$emit("EVENT_FIREBASE_ADD_DOCUMENT", 'instance data')
        const mInstance = await firebase.instance.add(instance)
        const mId = mInstance.id

        // inserting dusun
        for (let d = 0; d < dusuns.length; d++) {
          let dusunName = dusuns[d][0]
          let obj = {
            name: dusunName,
            timestamp: new Date()
          }

          window.getApp.$emit("EVENT_FIREBASE_ADD_DOCUMENT", `${d+1} of ${dusuns.length} dusun`)
          let newDusun = await firebase.instance.doc(mId).collection("dusun").add(obj)
          dusunMap[dusunName] = newDusun.id
        }


        // inserting worker
        for (let w = 0; w < workers.length; w++) {
          let area = []
          for (let a = 2; a < workers[w].length; a++) {
            if (workers[w][a] !== null) {
              area.push(dusunMap[workers[w][a]])
            }
          }

          let obj = {
            name: workers[w][0],
            phone: workers[w][1],
            area: area,
            timestamp: new Date()
          }

          window.getApp.$emit("EVENT_FIREBASE_ADD_DOCUMENT", `${w+1} of ${workers.length} worker`)
          await firebase.instance.doc(mId).collection("worker").add(obj)
        }

        // inserting customer
        for (let c = 0; c < customers.length; c++) {
          const element = customers[c];
          let obj = {
            name: customers[c][0],
            phone: customers[c][1],
            dusun: dusunMap[customers[c][2]],
            timestamp: new Date()
          }

          window.getApp.$emit("EVENT_FIREBASE_ADD_DOCUMENT", `${c+1} of ${customers.length} customer`)
          await firebase.instance.doc(mId).collection("customer").add(obj)
        }

        snackbarMessage = `${instance.name} created with ${dusuns.length} dusuns, ${workers.length} workers, and ${customers.length} customers`
        snackbarColor = 'success'
      } catch (error) {
        console.log(error);
        snackbarMessage = `error on creating new instance, reason: ${error}`
        snackbarColor = 'error'
      }

      commit('clearCacheDusun')
      commit('clearCacheWorker')
      commit('clearCacheCustomer')
      dispatch('showSnackbar', {
        message: snackbarMessage,
        color: snackbarColor
      })
      window.getApp.$emit("EVENT_TOGGLE_PROGGRESS_DIALOG")
    },
  }
})