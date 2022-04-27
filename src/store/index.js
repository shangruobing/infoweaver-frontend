import { createStore } from "vuex";

const store = createStore({
    state: {
        hasHistory: false,
        displayPreview: false,
        isSelectedFile: false,
        chatCount: 0,
        history: { context: [] },

        username: "ruobing",

        isLogin: false,
    },
    getters: {
        getUsername: (state) => {
            return state.username;
        },
        getIsLogin: (state) => {
            return state.isLogin;
        },
    },
    mutations: {
        clearHistory(state) {
            state.hasHistory = false;
            state.displayPreview = false;
            state.isSelectedFile = false;
            state.chatCount = 0;
            state.history = { context: [] };
        },
    },
    actions: {},
    modules: {},
});

export default store;
