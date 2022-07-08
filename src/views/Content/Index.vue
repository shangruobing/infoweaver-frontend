<template>
  <el-container>
    <side-bar :isCollapse="true" @clickMenu="clickEven" />
    <el-container>
      <el-header> <header-bar :sub-menu="bread.subMenu" :menu-item="bread.menuItem" /></el-header>
      <el-main>
        <transition> <router-view> </router-view></transition>
      </el-main>
      <!-- <el-footer>Footer {{ bread }}</el-footer> -->
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import SideBar from './SideBar.vue'
import HeaderBar from './Header.vue'

import { reactive } from 'vue'

const bread = reactive({
  subMenu: '',
  menuItem: ''
})

const clickEven = (value: any) => {
  bread.subMenu = value.subMenu
  bread.menuItem = value.menuItem
}
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
