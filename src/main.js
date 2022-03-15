import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import Axios from "axios";
import Router from "./router/index.js";
// import store from './store/index.js'
import zhCn from "element-plus/es/locale/lang/zh-cn";
import Chat from "vue3-beautiful-chat";
import "default-passive-events";

const app = createApp(App);

app.use(ElementPlus, { locale: zhCn });
app.use(Router);
app.use(Chat);
app.mount("#app");
app.config.globalProperties.$axios = Axios;

const http = "http://127.0.0.1:8000/api/";
// const http = "http://10.38.81.165:8000/api/";

app.config.globalProperties.$http = http;
