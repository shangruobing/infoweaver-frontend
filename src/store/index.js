import { createStore } from 'vuex'

const store = createStore({
  state: {
    username: 'ruobing',
    isLogin: false
  },
  getters: {
    getUsername: (state) => {
      return state.username
    },
    getIsLogin: (state) => {
      return state.isLogin
    }
  },
  mutations: {
    clearHistory(state) {
      state.hasHistory = false
      state.displayPreview = false
    }
  },
  actions: {},
  modules: {}
})

export default store
