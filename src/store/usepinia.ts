import { defineStore } from 'pinia'

interface UserInfo {
  username: string
  type: number
  auth: string
  avatarURL: string
}

export const mainStore = defineStore('main', {
  state: () => ({
    isLogin: false,
    userInfo: {
      username: '',
      type: 0,
      auth: '',
      avatarURL: ''
    }
  }),
  getters: {
    getLoginState(state) {
      return state.isLogin
      // return state.phone.toString().replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
    },
    getUserInfo(state) {
      return state.userInfo
    }
  },
  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },

    logout() {
      this.isLogin = false
      this.userInfo = {
        username: '',
        type: 0,
        auth: '',
        avatarURL: ''
      }
    }
  }
})
