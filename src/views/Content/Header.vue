<template>
  <div class="header-nav-bar">
    <el-row justify="space-between" align="middle">
      <el-col :span="12">
        <el-row align="middle" style="min-width: 100px">
          <el-button size="large" text class="header-button" @click="changeMenuView">
            <el-icon :size="20" v-if="!store.getters.isCollapse"><fold /></el-icon>
            <el-icon :size="20" v-else><expand /></el-icon>
          </el-button>

          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/content/' }">
              <span style="cursor: pointer; color: #222222">首页</span>
            </el-breadcrumb-item>

            <el-breadcrumb-item v-if="routeInfo.subMenu">
              {{ routeInfo.subMenu }}
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="routeInfo.menuItem">
              {{ routeInfo.menuItem }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-row>
      </el-col>

      <el-col :span="12">
        <el-row align="right" justify="end" style="width: 100%">
          <el-menu
            mode="horizontal"
            active-text-color="#000000"
            background-color="f0f2f4"
            :ellipsis="false"
          >
            <el-menu-item index="1" class="header-menu-item hidden-xs-only">消息通知</el-menu-item>
            <el-menu-item index="2" class="header-menu-item hidden-xs-only">系统设置</el-menu-item>
            <el-menu-item index="3" class="header-menu-item hidden-xs-only">个人中心</el-menu-item>
            <el-menu-item index="4" class="header-menu-item">
              <personal-center />
            </el-menu-item>
          </el-menu>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { Fold, Expand, ArrowRight } from '@element-plus/icons-vue'
import PersonalCenter from '@/components/PersonalCenter.vue'
import 'element-plus/theme-chalk/display.css'
import { useStore } from 'vuex'
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'

const store = useStore()

const changeMenuView = () => {
  store.commit('changeCollapseState')
  const asideMenu = document.getElementById('asideMenu')!
  asideMenu.style.width = store.getters.isCollapse ? '55px' : '200px'
}

const route = useRoute()
const routeInfo = reactive({
  subMenu: route.matched[1].meta.subMenu,
  menuItem: route.matched[1].meta.menuItem
})

watch(route, (to) => {
  if (to.matched[1]) {
    routeInfo.subMenu = to.matched[1].meta.subMenu as string
    routeInfo.menuItem = to.matched[1].meta.menuItem as string
  }
})
</script>

<style lang="scss" scoped>
$header-color: #fff;

.header-nav-bar {
  padding: 0px !important;
  margin: 0px !important;
  background-color: $header-color;
  height: 60px;
}

.el-menu {
  border: none;
  height: 100%;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border: none;
}

.el-row {
  padding: 0;
  height: 100%;
}
.el-col {
  height: 100%;
}

.header-menu-item {
  width: 25%;
  min-width: 70px;
  height: 100%;
  border: none;
}

.header-button {
  padding-right: 10px;
  padding-left: 10px;
  margin-right: 10px;
  background-color: $header-color;
  border: none;
}
</style>
