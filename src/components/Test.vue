<template>
  <p>{{ result }}</p>
  <el-button @click="search">点我搜索</el-button>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";
import getHttp from "../utils/DjangoHttp";
import Axios from "axios";
const instance = getCurrentInstance();
const http = getHttp(instance);
const result: any = ref("百度搜索结果");
const search = async () => {
  Axios.defaults.withCredentials = true
  const response = await Axios.get("https://baike.baidu.com/item/%E6%98%86%E6%98%8E%E7%90%86%E5%B7%A5%E5%A4%A7%E5%AD%A6");
  result.value = response;
  console.log(response);
};
</script>
