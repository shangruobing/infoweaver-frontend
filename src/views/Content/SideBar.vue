<template>
  <el-scrollbar>
    <div id="asideMenu" class="aside-bar" :style="{ width: windowWidth }">
      <transition name="logo-fade" mode="out-in">
        <img
          src="@/assets/infoweaver/白全.svg"
          width="160"
          height="70"
          alt="logo"
          v-if="!store.isCollapse"
        />
        <img src="@/assets/infoweaver/白.svg" width="50" height="70" alt="logo" v-else />
      </transition>

      <el-menu
        active-text-color="#ffd04b"
        background-color=" #40485B"
        text-color="#fff"
        :collapse="store.isCollapse"
        :collapse-transition="false"
        :unique-opened="true"
        router
      >
        <el-sub-menu :index="subMenu.index" v-for="subMenu in menu" :key="subMenu.index">
          <template #title>
            <el-icon>
              <component :is="subMenu.icon"></component>
            </el-icon>
            <span>{{ subMenu.item }}</span>
          </template>

          <el-menu-item
            :index="menuItem.index"
            v-for="menuItem in subMenu.subMenu"
            :key="menuItem.index"
          >
            <template #title>
              <el-icon>
                <component :is="menuItem.icon"></component>
              </el-icon>
              <span>{{ menuItem.item }}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </el-scrollbar>
</template>

<!-- eslint-disable import/no-duplicates -->
<script lang="ts" setup>
import type { Component } from 'vue'
import { onMounted, ref, watch } from 'vue'
import { Menu as MenuIcon, Reading, Search, PieChart, Document } from '@element-plus/icons'
import { View, UploadFilled, Edit, Setting, Cpu, Coin, Help } from '@element-plus/icons'

import { useMainStore } from '@/stores/index'

interface MenuItem {
  index: string
  item: string
  icon: Component
}

interface Menu extends MenuItem {
  subMenu: Array<MenuItem>
}

const menu: Array<Menu> = [
  {
    index: '1',
    item: '通知管理',
    icon: MenuIcon,
    subMenu: [
      { index: 'notice', item: '查看文件', icon: Reading },
      { index: 'neo4j', item: '文件查询', icon: Search },
      { index: 'echarts', item: '信息统计', icon: PieChart }
    ]
  },
  {
    index: '2',
    item: '文件管理',
    icon: Document,
    subMenu: [
      { index: 'fileList', item: '文件预览', icon: View },
      { index: 'upload', item: '文件上传', icon: UploadFilled },
      { index: 'markdown', item: 'Markdown', icon: Edit }
    ]
  },
  {
    index: '3',
    item: '系统设置',
    icon: Setting,
    subMenu: [
      { index: 'systemInfo', item: '运行状况', icon: Cpu },
      { index: 'dbInfo', item: '数据库监控', icon: Coin },
      { index: 'corpus', item: '问答语料', icon: Help }
    ]
  }
]

const store = useMainStore()
const windowWidth = ref('200px')

watch(
  () => store.isCollapse,
  (width) => {
    windowWidth.value = width ? '55px' : '200px'
  }
)

onMounted(() => {
  if (window.innerWidth < 700) {
    windowWidth.value = '55px'
    store.changeCollapseState()
  }
})

window.addEventListener('resize', () => {
  if (window.innerWidth < 700) {
    if (!store.isCollapse) {
      store.changeCollapseState()
      windowWidth.value = '55px'
    }
  } else {
    if (store.isCollapse) {
      store.changeCollapseState()
      windowWidth.value = '200px'
    }
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
