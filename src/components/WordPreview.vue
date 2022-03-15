<template>
  <div ref="file"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, getCurrentInstance } from "vue";
import axios from "axios";
import { renderAsync } from "docx-preview";
import { useRoute } from "vue-router";
import getHttp from "../utils/DjangoHttp";

const route = useRoute();
let file = ref();

onMounted(async () => {
  const id = route.params.id;
  const instance = getCurrentInstance();
  const http = getHttp(instance);
  try {
    const response = await axios({
      method: "GET",
      responseType: "blob", // 设置响应文件格式
      url: http + "word/" + id,
    });
    renderAsync(response.data, file.value); // 渲染到页面预览
  } catch (error) {
    console.log(error);
  }
});
</script>

<style></style>
