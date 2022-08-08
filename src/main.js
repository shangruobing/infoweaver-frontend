import { createApp } from 'vue'
import Axios from 'axios'
import App from './App.vue'
import 'default-passive-events'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import Chat from 'vue3-beautiful-chat'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as echarts from 'echarts'

import store from './store/index.js'
import Router from './router/index.js'

const app = createApp(App)

app.use(ElementPlus, { locale: zhCn })
app.use(store)
app.use(Router)
app.use(Chat)
app.mount('#app')
app.config.globalProperties.$axios = Axios
app.config.globalProperties.$echarts = echarts

const isDevelopmentMode = false
// const isDevelopmentMode = true;

// let http = 'http://43.138.43.128:8000/api/'
let http = 'https://www.infoweaver.cloud/api/'

if (isDevelopmentMode) {
  http = 'http://127.0.0.1:8000/api/'
}

app.config.globalProperties.$http = http

Axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('authorization')
  // const username = localStorage.getItem('username')
  if (config.headers.authorization) {
    // console.log('请求头含有auth')
    // console.log('这个auth是' + config.headers.authorization)
    return config
  }
  if (token) {
    config.headers.authorization = token
    // console.log('请求头没有auth 为请求头添加auth成功')
    // console.log('你的token是' + token)
    // console.log('你的username是' + username)
  }
  return config
})
