import { getCurrentInstance } from "vue";

export const getHttp = (): string => {
    // let http: string = "http://43.138.43.128:8000/api/";
    let http: string = "http://127.0.0.1:8000/api/";
    const instance = getCurrentInstance();
    if (instance !== null && instance.appContext.config.globalProperties.$http) {
        http = instance.appContext.config.globalProperties.$http;
    }
    return http;
};
