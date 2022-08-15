<template>
  <div class="containter">
    <el-row class="main-pan">
      <el-col class="left-pan">
        <stacked-line-chart />
      </el-col>

      <el-col class="right-pan">
        <el-row class="card-group">
          <el-col :span="12">
            <el-card shadow="always" class="card1">
              <template #header>
                <div class="card-header">
                  <span class="title">消息</span>
                  <el-icon :size="20"><Bell /></el-icon>
                </div>
              </template>
              <span class="text">今天有消息吗</span>
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
              <span class="text">今天天气如何</span>
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
              <span class="text">今天有收藏吗</span>
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
  </div>
</template>

<script lang="ts" setup>
import StackedLineChart from '@/components/charts/StackedLineChart.vue'
import { Bell, PartlyCloudy, Star, Location } from '@element-plus/icons-vue'

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
.containter {
  width: 100%;
  height: 100%;
}

.main-pan {
  background-color: #f0f2f4;
  height: 50%;
  text-align: center;
  min-height: 300px;
}

.left-pan,
.right-pan {
  height: 85%;
  flex: 1;
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

@media (max-width: 550px) {
  .containter {
    height: initial;
  }
  .main-pan {
    height: 50%;
    margin-bottom: 2em;

    .left-pan {
      flex: initial;
      height: 270px;
      width: 100%;
      margin-bottom: 1em;
    }
    .right-pan {
      flex: initial;
      height: 100%;
      width: 100%;
    }
  }
}

.card-group {
  height: 50%;
  .el-col {
    height: 100%;
  }
}
$card-margin: 5%;
.card1,
.card2,
.card3,
.card4 {
  height: 90%;
  width: 90%;
  max-height: 100%;
  background-color: white;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-icon:hover {
    color: red;
  }
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
