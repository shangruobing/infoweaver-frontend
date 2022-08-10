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

// let http = 'http://43.138.43.128:8000/api/'
let http = 'https://www.infoweaver.cloud/api/'

if (isDevelopmentMode) {
  http = 'http://127.0.0.1:8000/api/'
}

app.config.globalProperties.$http = http
