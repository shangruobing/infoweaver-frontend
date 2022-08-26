<template>
  <h1>测试页面</h1>
  <el-button @click="requestMethod">点击发请求</el-button>
</template>

<script setup lang="ts">
import service from '@/utils/request'
const requestMethod = async () => {
  const response = await service.get('https://www.infoweaver.cloud/api/docs/')
  console.log(' ', response)
}
</script>
