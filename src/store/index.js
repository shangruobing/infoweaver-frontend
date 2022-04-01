import { createStore } from "vuex";

const store = createStore({
    state: {
        hasHistory: false,
        username: "a1a1",
        isShowLoginDialog: false,
        isShowRegisterDialog: false,
        isLogin: false,
    },
    getters: {
        getUsername: (state) => {
            return state.username;
        },
        getIsShowLoginDialog: (state) => {
            return state.isShowLoginDialog;
        },
        getIsShowRegisterDialog: (state) => {
            return state.isShowRegisterDialog;
        },
        getIsLogin: (state) => {
            return state.isLogin;
        },
    },
    mutations: {
        setUsername(state, value) {
            state.username = value;
        },
        setIsShowLoginDialog(state, bool) {
            state.isShowLoginDialog = bool;
        },
        setIsShowRegisterDialog(state, bool) {
            state.isShowRegisterDialog = bool;
        },
        setIsLogin(state, bool) {
            state.isLogin = bool;
        },
    },
    actions: {},
    modules: {},
});

export default store;
