import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/router';
import createPersistedState from 'vuex-persistedstate'
const firebase = require('../plugins/firebase')

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {},
  mutations: {},
  actions: {}
})
