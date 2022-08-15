<template>
  <BaseChart chart-id="RadarChart" :option="option" />
</template>
<script setup lang="ts">
import { EChartsOption } from '@/utils/echarts'
import BaseChart from '@/components/charts/BaseChart.vue'

const option: EChartsOption = {
  legend: {
    data: ['管理与经济学院', '信息工程与自动化学院'],
    z: 3,
    orient: 'horizontal',
    left: 'center',
    top: 280,
    align: 'auto',
    borderRadius: 0,
    borderWidth: 0,
    padding: 0,
    itemGap: 10,
    itemWidth: 25,
    itemHeight: 14
  },
  radar: {
    indicator: [
      { name: '志愿公益', max: 200 },
      { name: '思想成长', max: 200 },
      { name: '实践实习', max: 200 },
      { name: '工作履历', max: 200 },
      { name: '文体活动', max: 200 },
      { name: '技能特长', max: 200 }
    ],
    radius: '60%',
    center: ['50%', '50%']
  },
  series: [
    {
      name: 'Budget vs spending',

      type: 'radar',
      data: [
        {
          value: [20, 150, 10, 10, 150, 30],
          name: '管理与经济学院'
        },
        {
          value: [30, 120, 15, 15, 140, 25],
          name: '信息工程与自动化学院'
        }
      ]
    }
  ]
}
</script>
