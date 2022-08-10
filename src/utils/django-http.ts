import { getCurrentInstance } from 'vue'

// This Function can be replaced by utils/request.ts axios.baseURL.
export const getHttp = (): string => {
  let http = 'http://127.0.0.1:8000/api/'
  const instance = getCurrentInstance()
  if (instance !== null && instance.appContext.config.globalProperties.$http) {
    http = instance.appContext.config.globalProperties.$http
  }
  return http
}
