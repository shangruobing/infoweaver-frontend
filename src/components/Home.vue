<template>
    <h1>欢迎来到通知文件问答系统 NFQA</h1>
    <h2>Notice File Question & Answer</h2>
    <h3>点击右下角体验机器人！</h3>
    <h4>为我们打分！<el-rate v-model="rate" @click="thanks" /></h4>

    <div>
        <el-button round @click="router.push('/content/')" type="primary">
            点击进入管理端!
        </el-button>
    </div>

    <my-robot></my-robot>
</template>

<script lang="ts" setup>
import { h, ref } from "vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";

import MyRobot from "./ChatRobot.vue";

const router = useRouter();
const rate = ref(null);

const thanks = () => {
    ElNotification({
        title: "谢谢评分😜",
        message: h("i", { style: "color: teal" }, "我们会继续努力的！"),
        position: "top-left",
    });
};
</script>

<style scoped></style>
