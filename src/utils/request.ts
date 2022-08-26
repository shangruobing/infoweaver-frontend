import Axios from 'axios'
import Router from '@/router/index.js'
import Notification from '@/utils/notification'

Axios.defaults.baseURL = 'https://www.infoweaver.cloud/api/'
// const CancelToken = Axios.CancelToken
// const source = CancelToken.source()

Axios.interceptors.request.use((config) => {
  if (config.headers?.authorization) {
    return config
  }

  const token = localStorage.getItem('authorization')
  if (token) {
    config.headers!.authorization = token
  }
  return config
})

Axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const status = error.response.status
    if (status === 403) {
      Router.push('/content/forbidden')

      if (error.response.data.detail === 'Expired token') {
        Notification({ text: '登录状态过期 请重新登陆' })
        Router.push('/login')
      }
    }

    if (status === 404) {
      if (error.request.responseURL === 'https://www.infoweaver.cloud/api/avatar/') {
        throw new Error("User don't have avatar.")
      }
      Router.push('/content/notFound')
    }

    return Promise.reject(error)
  }
)

export default Axios
