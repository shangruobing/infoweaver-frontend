<template>
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="名称" />
        <el-table-column prop="name" label="参数" />
    </el-table>
</template>

<script lang="ts" setup>
const tableData = [
    {
        date: "系统名称",
        name: "未设置",
    },
    {
        date: "操作系统",
        name: "未设置",
    },
    {
        date: "主机名称",
        name: "未设置",
    },
    {
        date: "内核名称",
        name: "未设置",
    },
    {
        date: "发行版本",
        name: "未设置",
    },
    {
        date: "内核版本",
        name: "未设置",
    },
    {
        date: "系统架构",
        name: "未设置",
    },
    {
        date: "当前时间",
        name: "未设置",
    },
    {
        date: "开机时间",
        name: "未设置",
    },
    {
        date: "运行时长",
        name: "未设置",
    },
];
</script>
