import { ComponentInternalInstance } from "vue";

const getHttp = (instance: ComponentInternalInstance | null): string => {
    let http: string = "http://127.0.0.1:8000/api/";
    if (instance !== null && instance.appContext.config.globalProperties.$http) {
        http = instance.appContext.config.globalProperties.$http;
    }
    return http;
};
export default getHttp;
