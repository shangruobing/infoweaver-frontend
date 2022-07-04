import { createStore } from 'vuex'

const store = createStore({
  state: {
    username: 'ruobing',
    isLogin: true
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
    logOut(state) {
      state.username = ''
    }
  },
  actions: {},
  modules: {}
})

export default store
