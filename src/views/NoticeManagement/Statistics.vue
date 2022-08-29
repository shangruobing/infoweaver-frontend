<template>
  <div class="containter">
    <el-row>
      <el-col :span="8">
        <line-chart />
      </el-col>
      <el-col :span="8">
        <effect-scatter-chart />
      </el-col>
      <el-col :span="8">
        <nightingale-chart />
      </el-col>
    </el-row>

    <el-divider border-style="double"></el-divider>

    <el-row>
      <el-col :span="8">
        <pie-chart />
      </el-col>
      <el-col :span="8">
        <radar-chart />
      </el-col>
      <el-col :span="8">
        <negative-bar />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import LineChart from '@/components/charts/LineChart.vue'
import EffectScatterChart from '@/components/charts/EffectScatterChart.vue'
import NightingaleChart from '@/components/charts/NightingaleChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import RadarChart from '@/components/charts/RadarChart.vue'
import NegativeBar from '@/components/charts/NegativeBar.vue'
</script>

<style lang="scss" scoped>
.containter {
  width: 100%;
  max-width: 100%;
}

.el-col {
  width: 100%;
  height: 300px;
  max-width: 100%;
}

.el-row {
  width: 100%;
  max-width: 100%;
  margin: 0;
  flex-wrap: nowrap;
}

@media (max-width: 900px) {
  .el-row {
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
}
</style>
