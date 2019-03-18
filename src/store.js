import Vue from 'vue'
import Vuex from 'vuex'
import router from './router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogedIn: false
  },

  mutations: {
    setLoginState(state, bool) {
      state.isLogedIn = bool
    },
    clearAllState(state) {
      state.isLogedIn = false
    }
  },
  actions: {
    userLogin({ commit }, authData) {
      if (authData.username === "zulfakar.ytb@gmail.com" && authData.password === "root") {
        sessionStorage.setItem("isLogedIn", true)
        commit('setLoginState', true)
        router.push('/dashboard')
      } else {
        console.log("login error")
      }
    },
    userLogout({ commit }) {
      localStorage.setItem("isLogedIn", false)
      commit('clearAllState')
      sessionStorage.removeItem('isLogedIn')
      router.push('/login')
    }
  }
})
