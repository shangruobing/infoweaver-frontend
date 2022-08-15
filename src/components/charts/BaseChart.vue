<template>
  <div :id="chartId" :style="{ width: '100%', height: '100%', textAlign: 'center' }"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import echarts from '@/utils/echarts'

type EChartsOption = echarts.EChartsOption
interface Props {
  chartId: string
  option: EChartsOption
}

const props = defineProps<Props>()
onMounted(() => {
  // 在初始化echarts前清空instance可以确保使用Vue-Router切换页面时echarts二次渲染成功
  document.getElementById(props.chartId)!.setAttribute('_echarts_instance_', '')
  const chartDom = document.getElementById(props.chartId)!
  const chart = echarts.init(chartDom)
  chart.setOption<EChartsOption>(props.option)
  props.option && chart.setOption(props.option)
  window.onresize = () => {
    chart.resize()
  }
})
</script>
