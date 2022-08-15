<template>
  <BaseChart chart-id="PieChart" :option="option" />
</template>
<script setup lang="ts">
import { EChartsOption } from '@/utils/echarts'
import BaseChart from '@/components/charts/BaseChart.vue'

const option: EChartsOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)'
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['35%', '30%'],
      center: ['50%', '60%'],
      startAngle: 100,
      minAngle: 5, // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
      avoidLabelOverlap: true,
      label: {
        show: true,
        formatter: '{b|{b}}\n{hr|}\n{b|{c}份|{d}%}',
        fontSize: 10,
        color: 'black',
        rich: {
          b: {
            color: 'black',
            lineHeight: 20
          },
          hr: {
            borderColor: '#A5B5F9',
            width: '100%',
            borderWidth: 1,
            height: 0
          }
        }
      },
      itemStyle: {
        borderWidth: 3,
        borderColor: '#EFEFF4',
        color: function (params) {
          // 自定义颜色
          const colorList = [
            '#444349',
            '#F7A35B',
            '#7CB5EC',
            ' #F25C00 ',
            '#9090E0',
            '#4AC2A1',
            '#06cfbf',
            '#017717',
            '#ff467a',
            '#1c61fe',
            '#fec61c',
            '#e61cfe'
          ]
          return colorList[params.dataIndex]
        }
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        lineStyle: {
          type: 'solid'
        },
        length: 10,
        length2: 25
      },
      data: [
        // { value: 100, name: "学院文件" },
        { value: 50, name: '志愿公益' },
        { value: 150, name: '学科竞赛' },
        { value: 300, name: '社团活动' },
        { value: 100, name: '讲座演讲' }
      ]
    }
  ]
}
</script>
