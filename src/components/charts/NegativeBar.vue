<template>
  <BaseChart chart-id="NegativeBar" :option="option" />
</template>
<script setup lang="ts">
import { EChartsOption } from '@/utils/echarts'
import BaseChart from '@/components/charts/BaseChart.vue'

const option: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
    // formatter: (params) => {
    //   if (!params.length) return ''
    //   let s = params[0].axisValueLabel + '<br/>'
    //   for (const iterator of params) {
    //     // 如果是负数则反转
    //     const d = iterator.data < 0 ? -iterator.data : iterator.data
    //     s += iterator.marker + iterator.seriesName + '：' + d + '<br/>'
    //   }
    //   return s
    // }
  },
  legend: {
    data: ['管理与经济学院', '环境科学与工程学院']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value'
      // axisLabel: {
      //   formatter: (value: number) => {
      //     // 负数取反 显示的就是正数了
      //     if (value < 0) return -value
      //     else return value
      //   }
      // }
    }
  ],
  yAxis: [
    {
      type: 'category',
      axisTick: {
        show: false
      },
      data: ['技能特长', '志愿公益', '实践实习', '思想成长', '文体活动']
    }
  ],
  series: [
    {
      name: '环境科学与工程学院',
      type: 'bar',
      stack: '人口',
      label: {
        show: true
      },
      data: [30, 26, 41, 74, 93]
    },
    {
      name: '管理与经济学院',
      type: 'bar',
      stack: '人口',
      label: {
        show: true,
        position: 'inside'
        // formatter: (value) => {
        //   // 值都是负数的 所以需要取反一下
        //   return -value.data
        // }
      },
      data: [-50, -32, -21, -88, -88]
    }
  ]
}
</script>
