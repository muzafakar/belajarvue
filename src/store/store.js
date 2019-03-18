import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/router';
const firebase = require('../plugins/firebase')


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    owner: null
  },

  mutations: {
    saveOwner(state, val) {
      state.owner = val
    },
    logoutProcedure(state) {
      // delete all session key-value here
      // set state to null or false
      sessionStorage.removeItem('user')
      state.currentUser = null
    },
    loginProcedure(state, user) {
      // save all session key-value here
      // set state to any or true
      this.dispatch('fetchOwner') // check wheter we already have owner on localStorage or not
      state.currentUser = user
    }
  },

  actions: {
    async userLogin({ commit }, authData) {
      try {
        const auth = await firebase.auth.signInWithEmailAndPassword(authData.email, authData.password)
        sessionStorage.setItem('user', JSON.stringify(auth.user))
        commit('loginProcedure', auth.user)
        router.push('/dashboard')
      } catch (error) {
        console.log("login error")
      }
    },
    userLogout({ commit }) {
      commit('logoutProcedure')
      router.push('/login')
    },
    fetchOwner() {
      firebase.owner.get().then(snapshot => {
        let owners = []
        snapshot.forEach(doc => {
          let owner = doc.data()
          owner.id = doc.id
          owners.push(owner)
        })
        localStorage.setItem('owner', JSON.stringify(owners))
        this.commit('saveOwner', owners)
      }).catch(error => {
        console.log(error)
      })
    }
  }
})
