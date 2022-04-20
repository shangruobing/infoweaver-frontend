<template>
    <el-container>
        <el-aside width="200px">
            <img src="../assets/白全.svg" width="160" height="70" />
            <el-menu
                active-text-color="#ffd04b"
                background-color=" #40485B"
                text-color="#fff"
                :collapse="isCollapse"
                router
            >
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <icon-menu />
                        </el-icon>
                        <span>通知管理</span>
                    </template>
                    <el-menu-item index="notice">查看文件</el-menu-item>
                    <el-menu-item index="neo4j">文件查询</el-menu-item>
                    <el-menu-item index="echarts">用户数据</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>文件管理</span>
                    </template>
                    <el-menu-item index="fileList">文件预览</el-menu-item>
                    <el-menu-item index="upload">文件上传</el-menu-item>
                    <el-menu-item>文件迁移</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="3">
                    <template #title>
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>系统设置</span>
                    </template>
                    <el-menu-item index="systemInfo">运行状况</el-menu-item>
                    <el-menu-item>数据库监控</el-menu-item>
                    <el-menu-item index="chatRobot">问答机器人</el-menu-item>
                    <el-menu-item>系统参数</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header>
                <el-row justify="end" align="middle">
                    <el-col :span="15">
                        <el-row align="middle">
                            <el-button size="large" class="header-button">
                                <el-icon :size="20"><fold /></el-icon>
                            </el-button>
                            <el-breadcrumb :separator-icon="ArrowRight">
                                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                                <el-breadcrumb-item>用户数据</el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-row>
                    </el-col>

                    <el-col :span="9" align="right">
                        <el-menu mode="horizontal" active-text-color="#000000" background-color="f0f2f4">
                            <el-menu-item index="1" class="header-menu-item">消息通知</el-menu-item>
                            <el-menu-item index="2" class="header-menu-item">系统设置</el-menu-item>
                            <el-menu-item index="3" class="header-menu-item">个人中心</el-menu-item>
                            <el-menu-item index="4" class="header-menu-item">
                                <el-dropdown>
                                    <el-avatar
                                        src="https://portrait.gitee.com/uploads/avatars/user/3474/10422230_shangruobing_1644648546.png!avatar200"
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
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { Expand, Fold, ArrowRight } from "@element-plus/icons-vue";
import { Setting, Document, Menu as iconMenu } from "@element-plus/icons";

//TODO 页面折叠
const isCollapse = ref(false);
</script>

<style scoped>
.el-container {
    padding: 0px !important;
    margin: 0px !important;
    height: 100vh;
}

.el-aside {
    color: var(--el-text-color-primary);
    background-color: #40485b;
}

.el-header {
    background-color: #f0f2f4;
    padding: 0;
    border-bottom: 4px solid #40485b;
}

.el-footer {
    background-color: #40485b;
}

.el-main {
    background-color: #f0f2f5;
}

.el-row {
    padding: 0;
    height: 100%;
}

:deep(.el-sub-menu),
.el-menu-item,
:deep(.el-sub-menu__title) {
    width: 200px;
}

:deep(.el-menu--horizontal) {
    text-align: right;
    width: 350px;
}

:deep(.el-menu--horizontal > .el-menu-item.is-active) {
    height: 53px;
    border: 0;
}

.aside-menu-item {
    width: 80px;
    height: 53px;
    border: 0;
}

.header-menu-item {
    width: 70px;
    height: 53px;
    border: 0;
}

.header-button {
    padding-right: 20px;
    padding-left: 10px;
    color: #303133;
    height: 53px;
    background-color: #f0f2f4;
    border: none;
}
</style>
