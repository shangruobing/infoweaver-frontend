import { createApp, provide } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import Axios from "axios"
import Router from './router/index.js'
// import store from './store/index.js'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Chat from 'vue3-beautiful-chat'
const app = createApp(App)

app.use(ElementPlus, { locale: zhCn })
app.use(Router)
app.use(Chat)
app.mount('#app')
app.config.globalProperties.$axios = Axios
// app.config.globalProperties.$echarts = echarts

// Axios.interceptors.request.use(function (config) {
//     let token = localStorage.getItem('authorization')
//     let username = localStorage.getItem('username')
//     if (config.headers['authorization']) {
//         // console.log("请求头含有auth")
//         // console.log("这个auth是" + config.headers['authorization'])
//         return config
//     }
//     if (token) {
//         config.headers['authorization'] = token
//         // console.log("请求头没有auth 为请求头添加auth成功")
//         // console.log('你的token是' + token)
//         // console.log('你的username是' + username)
//     }
//     return config
// })
