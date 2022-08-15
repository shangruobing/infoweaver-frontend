<template>
  <BaseChart chart-id="NightingaleChart" :option="option" />
</template>
<script setup lang="ts">
import { EChartsOption } from '@/utils/echarts'
import BaseChart from '@/components/charts/BaseChart.vue'

const option: EChartsOption = {
  legend: {
    top: 'bottom'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [15, 55],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 2
      },
      data: [
        { value: 40, name: '文体活动' },
        { value: 38, name: '志愿公益' },
        { value: 32, name: '思想成长' },
        { value: 30, name: '技能特长' },
        { value: 28, name: '实践实习' },
        { value: 26, name: '工作履历' },
        { value: 22, name: '创新创业' }
      ]
    }
  ]
}
</script>
