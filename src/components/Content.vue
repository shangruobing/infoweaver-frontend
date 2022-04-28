<template>
    <el-scrollbar>
        <el-container>
            <el-aside width="200px">
                <img src="../assets/白全.svg" width="160" height="70" />
                <el-menu
                    active-text-color="#ffd04b"
                    background-color=" #40485B"
                    text-color="#fff"
                    :collapse="isCollapse"
                    router
                    :unique-opened="true"
                >
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon><icon-menu /></el-icon>
                            <span>通知管理</span>
                        </template>

                        <el-menu-item index="notice" @click="clickMenu('通知管理', '查看文件')">
                            <template #title>
                                <el-icon><Reading /></el-icon>
                                <span>查看文件</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="neo4j" @click="clickMenu('通知管理', '文件查询')">
                            <template #title>
                                <el-icon><Search /></el-icon>
                                <span>文件查询</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="echarts" @click="clickMenu('通知管理', '信息统计')">
                            <template #title>
                                <el-icon><PieChart /></el-icon>
                                <span>信息统计</span>
                            </template>
                        </el-menu-item>
                    </el-sub-menu>

                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon><document /></el-icon>
                            <span>文件管理</span>
                        </template>

                        <el-menu-item index="fileList" @click="clickMenu('文件管理', '文件预览')">
                            <template #title>
                                <el-icon><View /></el-icon>
                                <span>文件预览</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="upload" @click="clickMenu('文件管理', '文件上传')">
                            <template #title>
                                <el-icon><UploadFilled /></el-icon>
                                <span>文件上传</span>
                            </template>
                        </el-menu-item>
                    </el-sub-menu>

                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon><setting /></el-icon>
                            <span>系统设置</span>
                        </template>

                        <el-menu-item index="systemInfo" @click="clickMenu('系统设置', '运行状况')">
                            <template #title>
                                <el-icon><Cpu /></el-icon>
                                <span>运行状况</span>
                            </template>
                        </el-menu-item>

                        <el-menu-item index="dbInfo" @click="clickMenu('系统设置', '数据库监控')">
                            <template #title>
                                <el-icon><Coin /></el-icon>
                                <span>数据库监控</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="chatRobot" @click="clickMenu('系统设置', '问答机器人')">
                            <template #title>
                                <el-icon><Help /></el-icon>
                                <span>问答机器人</span>
                            </template>
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header>
                    <el-row justify="space-between" align="middle">
                        <el-col :span="15">
                            <el-row align="middle">
                                <el-button size="large" class="header-button">
                                    <el-icon :size="20"><fold /></el-icon>
                                </el-button>
                                <el-breadcrumb :separator-icon="ArrowRight">
                                    <el-breadcrumb-item :to="{ path: '/' }">
                                        <span style="cursor: pointer, color: #222222;">首页</span>
                                    </el-breadcrumb-item>
                                    <el-breadcrumb-item v-if="submenu.length > 0">{{ submenu }}</el-breadcrumb-item>
                                    <el-breadcrumb-item v-if="menuItem.length > 0">{{ menuItem }}</el-breadcrumb-item>
                                </el-breadcrumb>
                            </el-row>
                        </el-col>

                        <el-col :span="9" align="right">
                            <el-menu
                                mode="horizontal"
                                active-text-color="#000000"
                                background-color="f0f2f4"
                                style="width: 290px"
                                :ellipsis="false"
                            >
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
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { Expand, Fold, ArrowRight } from "@element-plus/icons-vue";
import { Setting, Document, Menu as iconMenu, Cpu, Coin, Help, View } from "@element-plus/icons";
import { UploadFilled, PieChart, Reading, Search } from "@element-plus/icons";
//TODO 页面折叠
const isCollapse = ref(false);

const submenu = ref("");
const menuItem = ref("");

const clickMenu = (menu: string, item: string) => {
    submenu.value = menu;
    menuItem.value = item;
};
</script>

<style lang="scss" scoped>
$aside-color: #40485b;
$header-color: #fff;
$main-color: #f0f2f4;

.el-container {
    padding: 0px !important;
    margin: 0px !important;
    height: 100vh;
}

.el-aside {
    color: var(--el-text-color-primary);
    background-color: $aside-color;
}

.el-header {
    background-color: $header-color;
    padding: 0;
    border-bottom: 3px solid #f0f2f5;
    box-shadow: 0 7px 5px -5px #f2f4f5;
}

.el-main {
    background-color: $main-color;
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
    border: none;
}

:deep(.el-menu--horizontal > .el-menu-item.is-active) {
    height: 53px;
    border: none;
}

.aside-menu-item {
    width: 80px;
    height: 53px;
    border: none;
}

.header-menu-item {
    width: 70px;
    height: 53px;
    border: none;
}

.header-button {
    padding-right: 20px;
    padding-left: 10px;
    color: #303133;
    height: 53px;
    background-color: $header-color;
    border: none;
}
</style>
