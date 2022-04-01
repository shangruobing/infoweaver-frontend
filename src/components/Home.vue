<template>
    <h1>欢迎来到通知文件问答系统 NFQA</h1>
    <h2>Notice File Question & Answer</h2>
    <h3>Power By Ruobing Shang</h3>
    <router-link :to="'/content/'">点击进入</router-link>
    <my-robot></my-robot>
</template>

<script lang="ts" setup>
import MyRobot from "./ChatRobot.vue";
</script>
