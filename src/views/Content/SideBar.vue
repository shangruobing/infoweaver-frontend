<template>
  <el-scrollbar>
    <div id="asideMenu" class="aside-bar">
      <transition name="logo-fade" mode="out-in">
        <img
          src="@/assets/infoweaver/白全.svg"
          width="160"
          height="70"
          alt="logo"
          v-if="!store.getters.isCollapse"
        />
        <img src="@/assets/infoweaver/白.svg" width="50" height="70" alt="logo" v-else />
      </transition>
      <el-menu
        active-text-color="#ffd04b"
        background-color=" #40485B"
        text-color="#fff"
        :collapse="store.getters.isCollapse"
        :collapse-transition="false"
        router
        :unique-opened="true"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <icon-menu />
            </el-icon>
            <span>通知管理</span>
          </template>

          <el-menu-item index="notice">
            <template #title>
              <el-icon>
                <Reading />
              </el-icon>
              <span>查看文件</span>
            </template>
          </el-menu-item>
          <el-menu-item index="neo4j">
            <template #title>
              <el-icon>
                <Search />
              </el-icon>
              <span>文件查询</span>
            </template>
          </el-menu-item>
          <el-menu-item index="echarts">
            <template #title>
              <el-icon>
                <PieChart />
              </el-icon>
              <span>信息统计</span>
            </template>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <document />
            </el-icon>
            <span>文件管理</span>
          </template>

          <el-menu-item index="fileList">
            <template #title>
              <el-icon>
                <View />
              </el-icon>
              <span>文件预览</span>
            </template>
          </el-menu-item>
          <el-menu-item index="upload">
            <template #title>
              <el-icon>
                <UploadFilled />
              </el-icon>
              <span>文件上传</span>
            </template>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <setting />
            </el-icon>
            <span>系统设置</span>
          </template>

          <el-menu-item index="systemInfo">
            <template #title>
              <el-icon>
                <Cpu />
              </el-icon>
              <span>运行状况</span>
            </template>
          </el-menu-item>

          <el-menu-item index="dbInfo">
            <template #title>
              <el-icon>
                <Coin />
              </el-icon>
              <span>数据库监控</span>
            </template>
          </el-menu-item>
          <el-menu-item index="corpus">
            <template #title>
              <el-icon>
                <Help />
              </el-icon>
              <span>问答语料</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {
  Menu as iconMenu,
  Reading,
  Search,
  PieChart,
  Document,
  View,
  UploadFilled,
  Setting,
  Cpu,
  Coin,
  Help
} from '@element-plus/icons'

import { useStore } from 'vuex'

const windowWidth = window.innerWidth
const isCollapse = ref(windowWidth < 700)
const store = useStore()

onMounted(() => {
  if (isCollapse.value) {
    const asideMenu = document.getElementById('asideMenu')!
    asideMenu.style.width = '55px'
    store.commit('changeCollapseState')
  }
})
</script>

<style lang="scss" scoped>
$aside-color: #40485b;

.aside-bar {
  padding: 0px !important;
  margin: 0px !important;
  height: 100vh;
  color: var(--el-text-color-primary);
  background-color: $aside-color;
  width: 200px;
  min-width: 55px;
  transition: width 0.6s;

  .el-menu {
    border: none;
    width: 100%;

    .el-sub-menu {
      .el-menu-item {
        min-width: 100%;
      }
    }
  }

  .el-menu--collapse {
    :deep(.el-sub-menu__title) {
      padding-left: 15px;
    }
  }
}

.logo-fade-enter-from {
  opacity: 0;
}

.logo-fade-enter-active {
  transition: opacity 0.5s ease;
}

.logo-fade-leave-to {
  opacity: 0;
}

.logo-fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>
