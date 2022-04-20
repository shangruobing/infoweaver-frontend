<template>
    <el-container>
        <el-aside width="200px">
            <img src="../assets/白全.svg" width="160" height="70" />
            <el-menu default-active="2" active-text-color="#ffd04b" background-color=" #40485B" text-color="#fff">
                <!-- :collapse="isCollapse" -->
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
                            <setting />
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
                <!-- <el-row> -->
                <el-row justify="end" align="middle">
                    <!-- <div align="left"> -->
                    <el-col :span="15">
                        <!-- <el-menu mode="horizontal" active-text-color="#000000" background-color="f0f2f4"> -->
                        <!-- <el-menu-item index="1" -->
                        <el-row align="middle">
                            <el-button size="large">
                                <el-icon :size="20"><fold /></el-icon>
                            </el-button>
                            <!-- </el-col> -->

                            <!-- <el-col :span="10"> -->
                            <el-breadcrumb :separator-icon="ArrowRight">
                                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                                <el-breadcrumb-item>用户数据</el-breadcrumb-item>
                            </el-breadcrumb></el-row
                        >
                    </el-col>
                    <!-- </div> -->
                    <el-col :span="9">
                        <el-menu mode="horizontal" active-text-color="#000000" background-color="f0f2f4">
                            <el-menu-item index="1">消息通知</el-menu-item>
                            <el-menu-item index="2">系统设置</el-menu-item>
                            <el-menu-item index="3">个人中心</el-menu-item>
                            <el-menu-item index="4">
                                <el-dropdown>
                                    <el-avatar
                                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                                    />
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item>个人中心</el-dropdown-item>
                                            <el-dropdown-item>设置</el-dropdown-item>
                                            <el-dropdown-item disabled>禁用设置</el-dropdown-item>
                                            <el-dropdown-item divided>退出登录</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-header>

            <el-container>
                <el-main>
                    <component :is="showComponent"></component>
                    <router-view></router-view>
                </el-main>
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
import { ChatDotRound, Expand, Fold, ArrowRight } from "@element-plus/icons-vue";
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
        ChatDotRound,
        Expand,
        Fold,
        ArrowRight,
    },
    setup() {
        const showComponent = ref("empty");
        const isCollapse = ref(true);
        const Show = (name: string) => {
            showComponent.value = name;
        };
        return { showComponent, Show, ChatDotRound, isCollapse, ArrowRight };
    },
});
</script>

<style scoped>
.el-footer {
    background-color: #40485b;
}
:deep(.el-sub-menu),
.el-menu-item {
    width: 200px;
}

:deep(.el-sub-menu__title) {
    width: 200px;
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
    /* height: 100vh; */
    background-color: #40485b;
}

.el-header {
    background-color: #f0f2f4;

    padding: 0;

    /* border-bottom: 4px solid #40485b */
    border-bottom: 4px solid #40485b
    /* border-top: 3px solid #40485b; */
}
.el-container {
    padding: 0px !important;
    margin: 0px !important;
    height: 100vh;
}

.el-row {
    padding: 0;
    height: 100%;
}
.el-main {
    background-color: #f0f2f5;
}

.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}
:deep(.el-menu--horizontal > .el-menu-item.is-active) {
    width: 80px;
    height: 53px;
    border: 0;
}
:deep(.el-menu-item) {
    width: 80px;
    height: 53px;
    border: 0;
}

:deep(.el-menu--horizontal) {
    /* width: 400px; */
    text-align: right;
}
/* .el-icon svg {
    width: 2em;
    height: 2em;
} */
.el-button--large {
    padding-right: 20px;
    padding-left: 10px;
    color: #303133;
    height: 53px;
    background-color: #f0f2f4;
    border: 0;
}
</style>
