<template>
  <h1 style="font-size: xx-large">欢迎来到织信科技问答系统管理员端</h1>
  <div id="chart" :style="{ width: '100%', height: '80%', textAlign: 'center' }"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue'

onMounted(() => {
  type EChartsOption = echarts.EChartsOption
  const chartDom = document.getElementById('chart')!
  const myChart = echarts.init(chartDom)
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
    grid: { top: '55%' },
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
      },
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
        emphasis: {
          focus: 'self'
        },
        label: {
          formatter: '{b}: {@2022} ({d}%)'
        },
        encode: {
          itemName: 'product',
          value: '2022',
          tooltip: '2022'
        }
      }
    ]
  }

  myChart.on('updateAxisPointer', function (event: any) {
    const xAxisInfo = event.axesInfo[0]
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1
      myChart.setOption<echarts.EChartsOption>({
        series: {
          id: 'pie',
          label: {
            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
          },
          encode: {
            value: dimension,
            tooltip: dimension
          }
        }
      })
    }
  })

  myChart.setOption<echarts.EChartsOption>(option)
  option && myChart.setOption(option)
})
</script>
