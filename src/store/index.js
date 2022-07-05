import { createStore } from 'vuex'

const store = createStore({
  state: {
    username: '',
    isLogin: false
  },
  getters: {
    username: (state) => {
      return state.username
    },
    isLogin: (state) => {
      return state.isLogin
    }
  },
  mutations: {
    loginSuccess(state, payload) {
      state.isLogin = true
      state.username = payload
    },
    logout(state) {
      state.isLogin = false
      state.username = ''
    }
  },
  actions: {},
  modules: {}
})

export default store
