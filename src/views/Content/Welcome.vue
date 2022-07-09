<template>
  <el-row class="main-pan" justify="space-between">
    <el-col :span="12" class="left-pan">
      <div id="chart" :style="{ width: '100%', height: '110%', textAlign: 'center' }"></div>
    </el-col>

    <el-col :span="12" class="right-pan">
      <el-row class="card-group">
        <el-col :span="12">
          <el-card shadow="always" class="card1">
            <template #header>
              <div class="card-header">
                <span class="title">消息</span>
                <el-icon :size="20"><Bell /></el-icon>
              </div>
            </template>
            <span class="text">今天有收到消息吗</span>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card shadow="always" class="card2">
            <template #header>
              <div class="card-header">
                <span class="title">天气</span>
                <el-icon :size="20"><PartlyCloudy /></el-icon>
              </div>
            </template>
            <span class="text">今天天气怎么样</span>
          </el-card>
        </el-col>
      </el-row>

      <el-row class="card-group">
        <el-col :span="12">
          <el-card shadow="always" class="card3">
            <template #header>
              <div class="card-header">
                <span class="title">收藏</span>
                <el-icon :size="20"><Star /></el-icon>
              </div>
            </template>
            <span class="text">今天有多少收藏呀</span>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="always" class="card4">
            <template #header>
              <div class="card-header">
                <span class="title">位置</span>
                <el-icon :size="20"><Location /></el-icon>
              </div>
            </template>
            <span class="text">今天你在哪呀</span>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

  <el-row class="extend-pan">
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </el-row>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import { Bell, PartlyCloudy, Star, Location } from '@element-plus/icons-vue'
onMounted(() => {
  type EChartsOption = echarts.EChartsOption
  // 在初始化echarts前清空instance可以确保使用Vue-Router切换页面时echarts二次渲染成功
  document.getElementById('chart')!.setAttribute('_echarts_instance_', '')
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

  myChart.setOption<echarts.EChartsOption>(option)
  option && myChart.setOption(option)
})

interface User {
  date: string
  name: string
  address: string
}

const tableRowClassName = ({ row, rowIndex }: { row: User; rowIndex: number }) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>

<style lang="scss" scoped>
.main-pan {
  background-color: #f0f2f4;
  height: 50%;
  text-align: center;
}

.left-pan,
.right-pan {
  height: 85%;
  flex: 0 0 46%;
  align-self: center;
}

.left-pan {
  background-color: white;
  margin-left: 2%;
  margin-right: 1%;
}
.right-pan {
  background-color: #f0f2f4;
  margin-right: 2%;
  margin-left: 1%;
}

.card-group {
  height: 50%;
}

// $card-margin: 5px;
$card-margin: 5%;
.card1,
.card2,
.card3,
.card4 {
  height: 90%;
  width: 90%;
  // width: 200px;
  background-color: white;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card1 {
  margin-right: $card-margin;
  margin-bottom: $card-margin;
}

.card2 {
  margin-left: $card-margin;
  margin-bottom: $card-margin;
}

.card3 {
  margin-right: $card-margin;
  margin-top: $card-margin;
}

.card4 {
  margin-left: $card-margin;
  margin-top: $card-margin;
}

.title {
  font-weight: bold;
  font-size: medium;
}
.text {
  font-style: italic;
  font-size: small;
}

.extend-pan {
  height: 50%;
  margin-left: 2%;
  margin-right: 2%;
}
</style>
