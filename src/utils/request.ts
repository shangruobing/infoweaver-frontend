import Axios from 'axios'
import Router from '@/router/index.js'

Axios.defaults.baseURL = 'https://www.infoweaver.cloud/api/'

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authorization')
  // const username = localStorage.getItem('username')
  if (config.headers?.authorization) {
    // console.log('Header has auth')
    return config
  }
  if (token) {
    config.headers!.authorization = token
    // console.log('Successfully Add auth in Header', username)
  }
  return config
})

Axios.interceptors.response.use(
  (response) => {
    // console.log('success', response)
    return response
  },
  (error) => {
    // console.log('error', error)
    const status = error.response.status
    // console.log('Error Code', status)
    if (status === 403) {
      // console.log('Forbidden')
      Router.push('/content/forbidden')
    }
    if (status === 404) {
      // console.log('Not Found')
      Router.push('/content/notFound')
    }

    return Promise.reject(error)
  }
)

export default Axios
