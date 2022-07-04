<template>
  <el-table stripe style="width: 100%" :data="sysinfo">
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="value" label="参数" />
  </el-table>
</template>

<script lang="ts" setup>
import Axios from 'axios'
import { onMounted, reactive } from 'vue'
import { getHttp } from '@/utils/django-http'
const http = getHttp()

const sysinfo = reactive([{ name: 'NFQA', value: 'V1.0' }])

onMounted(async () => {
  const api = http + 'sysinfo/'
  const response = await Axios.get(api)
  try {
    const results = response.data
    for (const i in results) {
      sysinfo.push({ name: i.toUpperCase(), value: results[i] })
    }
  } catch (error) {
    console.log(error)
  }
})
</script>
