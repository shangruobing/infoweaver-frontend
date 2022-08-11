<template>
  <el-container>
    <el-header>
      <nav-bar />
    </el-header>
    <el-main>
      <main-pan />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import NavBar from './Header.vue'
import MainPan from './Main.vue'
</script>

<style lang="scss" scoped>
.el-container {
  padding: 0px !important;
  margin: 0px !important;
  height: 100vh;
  width: 100vw;
  background-color: #f2f4f5;
  min-width: 300px;
}

.el-header,
.el-main {
  padding: 0;
}
</style>
