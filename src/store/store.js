import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/router';
const firebase = require('../plugins/firebase')
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    owner: []
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
    }
  }
})
