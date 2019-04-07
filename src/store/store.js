import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/router';
import createPersistedState from 'vuex-persistedstate'
const firebase = require('../plugins/firebase')

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {},
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
    }
  },
  actions: {
    showSnackbar({ }, snackbar) {
      snackbar.show = true
      window.getApp.$emit('EVENT_SNACKBAR', snackbar)
    },

    // AUTHTENTICATION

    async login({ dispatch, commit }, auth) {
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
      dispatch('showSnackbar', { message: snackbarMessage, color: snackbarColor })
    },

    logout({ commit }) {
      commit('logoutProcedure')
    },

    clean_logout({ commit }) {
      commit('clearCache')
      commit('logoutProcedure')
    }
  }
})
