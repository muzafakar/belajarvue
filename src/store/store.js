import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/router';
const firebase = require('../plugins/firebase')
import createPersistedState from 'vuex-persistedstate'

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
    async userLogin({ commit }, authData) {
      try {
        const auth = await firebase.auth.signInWithEmailAndPassword(authData.email, authData.password)
        commit('loginProcedure', auth.user)
        window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: "Assalamu'alaikum, " + auth.user.email + " :)", color: 'success' })
      } catch (error) {
        sessionStorage
        window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: "Login Failed, check email and password!", color: 'error' })
        console.log("login error")
      }
    },

    userLogout({ commit }) {
      commit('logoutProcedure')
      window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: "Loged Out", color: 'info' })
    },

    fetchOwner() {
      console.log('fetching remote data')
      this.commit('saveOwner', [])
      firebase.owner.get().then(snapshot => {
        let owners = []
        snapshot.forEach(doc => {
          let owner = doc.data()
          owner.id = doc.id
          owners.push(owner)
        })
        this.commit('saveOwner', owners)
      }).catch(error => {
        console.log(error)
      })
    },

    async addNewOwner({ commit }, ownerData) {
      try {
        await firebase.owner.add(ownerData)
        window.getApp.$emit('TOGGLE_PROGRESS_DIALOG')
        window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: "Add owner success ", color: 'success' })
      } catch (error) {
        window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: "Error on add owner: " + error, color: 'error' })
        window.getApp.$emit('TOGGLE_PROGRESS_DIALOG')
        console.log(error)
      }
    },
    
    async addNewInstance({ commit, state }, instanceData) {
      const dusuns = state.tDusun
      const workers = state.tWorker
      const customers = state.tCustomer

      const dusunNames = []
      const dusunId = []
      try {
        window.getApp.$emit('FIREBASE_ADD_ONE_DOCUMENT', "instance")
        const createdInstance = await firebase.instance.add(instanceData)
        const instanceId = createdInstance.id

        // Inserting Dusun
        for (let i = 1; i < dusuns.length; i++) {
          const newDusun = {
            name: dusuns[i][0],
            timestamp: new Date()
          }
          const createdDusun = await firebase.instance.doc(instanceId).collection('dusun').add(newDusun)
          window.getApp.$emit('FIREBASE_ADD_ONE_DOCUMENT', "dusun " + i + ' of ' + (dusuns.length - 1))

          dusunNames.push(newDusun.name)
          dusunId.push(createdDusun.id)
        }

        // Inserting Worker
        for (let i = 1; i < workers.length; i++) {
          const areaId = []
          for (let j = 2; j < workers[i].length; j++) {
            const indexId = dusunNames.indexOf(workers[i][j])
            areaId.push({ id: dusunId[indexId], name: workers[i][j] })
          }

          const newWorker = {
            name: workers[i][0],
            phone: workers[i][1],
            area: areaId,
            timestamp: new Date()
          }

          await firebase.instance.doc(instanceId).collection('worker').add(newWorker)
          window.getApp.$emit('FIREBASE_ADD_ONE_DOCUMENT', "dusun " + i + ' of ' + (workers.length - 1))
        }

        // Inserting Customer
        for (let i = 1; i < customers.length; i++) {
          const indexId = dusunNames.indexOf(customers[i][2])
          const newCustomer = {
            name: customers[i][0],
            phone: customers[i][1],
            dusun: { id: dusunId[indexId], name: customers[i][2] },
            timestamp: new Date()
          }

          await firebase.instance.doc(instanceId).collection('customer').add(newCustomer)
          window.getApp.$emit('FIREBASE_ADD_ONE_DOCUMENT', "customer " + i + ' of ' + (customers.length - 1))
        }

        window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: "Operation Complete", color: 'success' })
      } catch (error) {
        window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: "Error on add instance: " + error, color: 'error' })
        console.log(error)
      }
      commit('cacheDusun', [])
      commit('cacheWorker', [])
      commit('cacheCustomer', [])
      window.getApp.$emit('TOGGLE_PROGRESS_DIALOG')
    }
  }
})
