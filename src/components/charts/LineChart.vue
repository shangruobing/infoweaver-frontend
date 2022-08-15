<template>
  <BaseChart chart-id="LineChart" :option="option" />
</template>
<script setup lang="ts">
import { EChartsOption } from '@/utils/echarts'
import BaseChart from '@/components/charts/BaseChart.vue'

const option: EChartsOption = {
  title: { text: '总用户量' },
  tooltip: {},
  xAxis: {
    data: ['12-3', '12-4', '12-5', '12-6', '12-7', '12-8']
  },
  yAxis: {},
  series: [
    {
      name: '用户量',
      type: 'line',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
}
</script>
