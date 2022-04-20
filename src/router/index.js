import { createRouter, createWebHistory } from "vue-router";

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
        component: () => import("../components/UploadFileForm.vue"),
    },
    {
        path: "/echarts",
        name: "echarts",
        component: () => import("../components/Statistics.vue"),
    },
    {
        path: "/fileList",
        name: "fileList",
        component: () => import("../components/FileList.vue"),
    },
    {
        path: "/content",
        name: "content",
        component: () => import("../components/Content.vue"),
        children: [
            {
                path: "notice",
                name: "notice",
                component: () => import("../components/NoticeList.vue"),
            },
            {
                path: "neo4j",
                name: "neo4j",
                component: () => import("../components/Neo4j.vue"),
            },
            {
                path: "echarts",
                name: "echarts",
                component: () => import("../components/Statistics.vue"),
            },
            {
                path: "fileList",
                name: "fileList",
                component: () => import("../components/FileList.vue"),
            },
            {
                path: "upload",
                name: "upload",
                component: () => import("../components/UploadFileForm.vue"),
            },
            {
                path: "systemInfo",
                name: "systeminfo",
                component: () => import("../components/SystemInfo.vue"),
            },
            {
                path: "chatRobot",
                name: "chatRobot",
                component: () => import("../components/ChatRobot.vue"),
            },
        ],
    },
];
const index = createRouter({
    history: createWebHistory(),
    routes,
});
export default index;
