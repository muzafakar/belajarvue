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
      if (!localStorage.getItem('owner')) {
        this.dispatch('fetchOwner') // check wheter we already have owner on localStorage or not
      }
      state.currentUser = user
    }
  },

  actions: {
    async userLogin({ commit }, authData) {
      try {
        const auth = await firebase.auth.signInWithEmailAndPassword(authData.email, authData.password)
        sessionStorage.setItem('user', JSON.stringify(auth.user))
        router.push('/dashboard')
        commit('loginProcedure', auth.user)
        window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: "Assalamu'alaikum, " + auth.user.email + " :)", color: 'success' })
      } catch (error) {
        window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: "Login Failed, check email and password!", color: 'error' })
        console.log("login error")
      }
    },
    userLogout({ commit }) {
      commit('logoutProcedure')
      router.push('/login')
      window.getApp.$emit('SHOW_SNACKBAR', { show: true, text: "Loged Out", color: 'error darken-2' })
    },
    fetchOwner() {
      console.log('fetching remote data')
      localStorage.removeItem('owner')
      this.commit('saveOwner', null)
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
