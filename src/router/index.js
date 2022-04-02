import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("../components/Home.vue"),
    },
    {
        path: "/notice",
        name: "notice",
        component: () => import("../components/NoticeList.vue"),
    },
    {
        path: "/word/:id",
        name: "word",
        component: () => import("../components/WordPreview.vue"),
    },
    {
        path: "/content",
        name: "content",
        component: () => import("../components/Content.vue"),
    },
    {
        path: "/neo4j",
        name: "neo4j",
        component: () => import("../components/Neo4j.vue"),
    },
    {
        path: "/test",
        name: "test",
        component: () => import("../components/Test.vue"),
    },
    {
        path: "/chatRobot",
        name: "chatRobot",
        component: () => import("../components/ChatRobot.vue"),
    },
    {
        path: "/upload",
        name: "upload",
        component: () => import("../components/UploadFile.vue"),
    },
];
const index = createRouter({
    history: createWebHistory(),
    // history: createWebHashHistory(),
    routes,
});
export default index;
