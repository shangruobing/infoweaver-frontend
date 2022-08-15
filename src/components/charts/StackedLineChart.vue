<template>
  <BaseChart chart-id="StackedLineChart" :option="option" />
</template>
<script setup lang="ts">
import { EChartsOption } from '@/utils/echarts'
import BaseChart from '@/components/charts/BaseChart.vue'

const option: EChartsOption = {
  legend: {},
  tooltip: {
    trigger: 'axis',
    showContent: false
  },
  dataset: {
    source: [
      ['product', '2017', '2018', '2019', '2020', '2021', '2022'],
      ['文体活动', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
      ['志愿公益', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
      ['学科竞赛', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
      ['思想成长', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
    ]
  },
  xAxis: { type: 'category' },
  yAxis: { gridIndex: 0 },
  series: [
    {
      type: 'line',
      smooth: true,
      seriesLayoutBy: 'row',
      emphasis: { focus: 'series' }
    },
    {
      type: 'line',
      smooth: true,
      seriesLayoutBy: 'row',
      emphasis: { focus: 'series' }
    },
    {
      type: 'line',
      smooth: true,
      seriesLayoutBy: 'row',
      emphasis: { focus: 'series' }
    },
    {
      type: 'line',
      smooth: true,
      seriesLayoutBy: 'row',
      emphasis: { focus: 'series' }
    }
  ]
}
</script>
