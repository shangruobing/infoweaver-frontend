import { createStore } from 'vuex'

const store = createStore({
  state: {
    username: '',
    isLogin: false,
    isCollapse: false
  },
  getters: {
    username: (state) => {
      return state.username
    },
    isLogin: (state) => {
      return state.isLogin
    },
    isCollapse: (state) => {
      return state.isCollapse
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
    },
    changeCollapseState(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {},
  modules: {}
})

export default store
