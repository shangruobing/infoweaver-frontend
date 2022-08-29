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
  width: 100vw;
  height: 100vh;
  min-width: 300px;
  padding: 0 !important;
  margin: 0 !important;
  background-color: #f2f4f5;
}

.el-header,
.el-main {
  padding: 0;
}
</style>
