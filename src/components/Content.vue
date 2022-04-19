<template>
    <el-container>
        <el-aside width="200px">
            <img src="../assets/图标.svg" width="75" height="75" />

            <el-menu default-active="2" active-text-color="#ffd04b" background-color=" #40485B" text-color="#fff">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <icon-menu />
                        </el-icon>
                        <span>通知管理</span>
                    </template>
                    <el-menu-item index="1-1" @click="Show('noticeList')">查看文件</el-menu-item>
                    <el-menu-item index="1-2" @click="Show('neo4j')">文件查询</el-menu-item>
                    <el-menu-item index="1-3" @click="Show('myChart')">用户数据</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>文件管理</span>
                    </template>
                    <el-menu-item index="2-1" @click="Show('FileList')">文件预览</el-menu-item>
                    <el-menu-item index="2-2" @click="Show('upload')">文件上传</el-menu-item>
                    <el-menu-item index="2-3">文件迁移</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="3">
                    <template #title>
                        <el-icon>
                            <setting></setting>
                        </el-icon>
                        <span>系统设置</span>
                    </template>
                    <el-menu-item index="3-1" @click="Show('SystemInfo')">运行状况</el-menu-item>
                    <el-menu-item index="3-2">数据库监控</el-menu-item>
                    <el-menu-item index="3-3" @click="Show('MyRobot')">问答机器人</el-menu-item>
                    <el-menu-item index="3-4">系统参数</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header>
                <h2>InfoWeaver Intelligent Question Answering System</h2>
            </el-header>

            <el-container>
                <el-main>
                    <component :is="showComponent"></component>
                    <router-view></router-view>
                    <!-- <my-robt></my-robt> -->
                </el-main>
                <!-- <el-footer>Footer</el-footer> -->
            </el-container>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Message, Menu, Setting, Document } from "@element-plus/icons";
import { ElEmpty } from "element-plus";
import NoticeList from "./NoticeList.vue";
import Neo4j from "./Neo4j.vue";
import MyRobot from "./ChatRobot.vue";
import myChart from "./Statistics.vue";
import FileList from "./FileList.vue";
import upload from "./UploadFileForm.vue";
import SystemInfo from "./SystemInfo.vue";
export default defineComponent({
    name: "Content",
    components: {
        Message,
        Setting,
        "icon-menu": Menu,
        noticeList: NoticeList,
        neo4j: Neo4j,
        empty: ElEmpty,
        MyRobot,
        myChart,
        FileList,
        upload,
        SystemInfo,
        Document,
    },
    setup() {
        let showComponent = ref("empty");

        const Show = (name: string) => {
            showComponent.value = name;
        };
        return { showComponent, Show };
    },
});
</script>

<style scoped>
.el-header,
.el-footer {
    background-color: #40485b;
}

h2 {
    color: white;
    font-family: "Consolas";
}
.el-avatar {
    background-color: #999;
}
.el-aside {
    color: var(--el-text-color-primary);
    height: 100%;
    background-color: #40485b;
}

html,
body,
.el-container {
    padding: 0px !important;
    margin: 0px !important;
    height: 99vh;
}
</style>
