<template>
  <el-table stripe style="width: 100%" :data="sysinfo">
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="value" label="参数" />
  </el-table>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import service from '@/utils/request'

const sysinfo = reactive([{ name: 'InfoWeaver', value: 'V2.1.0' }])

onMounted(async () => {
  try {
    const response = await service.get('sysinfo')
    const results = response.data
    for (const i in results) {
      sysinfo.push({ name: i.toUpperCase(), value: results[i] })
    }
  } catch (error) {
    console.log(error)
  }
})
</script>
