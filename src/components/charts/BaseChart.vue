<template>
  <div :id="chartId" class="chart"></div>
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

<style lang="scss">
.chart {
  width: 100%;
  height: 100%;
  max-width: 100% !important;
  max-height: 100% !important;
  min-width: 200px;
  min-height: 200px;
  text-align: center;

  div,
  canvas {
    max-width: 100% !important;
    max-height: 100% !important;
  }
}
</style>
