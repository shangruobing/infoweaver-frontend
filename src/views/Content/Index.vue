<template>
  <el-container>
    <side-bar :isCollapse="true" />
    <el-container>
      <el-header> <header-bar /></el-header>
      <el-main>
        <transition> <router-view> </router-view> </transition>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import SideBar from './SideBar.vue'
import HeaderBar from './Header.vue'
</script>

<style lang="scss" scoped>
$main-color: #f0f2f4;

.el-container {
  padding: 0px !important;
  margin: 0px !important;
  height: 100vh;
}

.el-main {
  background-color: $main-color;
}
.el-footer {
  background-color: green;
}

.el-header {
  padding: 0;
}
</style>
