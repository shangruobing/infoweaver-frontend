<template>
  <el-container>
    <side-bar />
    <el-container>
      <el-header> <header-bar /></el-header>

      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
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
  flex-basis: 0;
  background-color: $main-color;
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

.fade-enter-active {
  transition: opacity 0.3s ease 0.3s;
}
.fade-leave-active {
  transition: opacity 0.3s ease 0s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
