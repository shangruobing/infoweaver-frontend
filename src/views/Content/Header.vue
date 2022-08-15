<template>
  <div class="header-nav-bar">
    <el-row justify="space-between" align="middle">
      <el-col :span="12" class="left-pan">
        <el-row align="middle">
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

      <el-col :span="12" class="right-pan">
        <el-row align="middle" justify="end">
          <el-menu
            mode="horizontal"
            active-text-color="#000000"
            background-color="f0f2f4"
            :ellipsis="false"
            style="max-width: 100%"
          >
            <el-tooltip effect="dark" content="消息通知" placement="bottom" :hide-after="100">
              <el-menu-item index="1" class="header-menu-item" @click="unfinished">
                <el-icon><Message /></el-icon>
                <span class="header-menu-label">消息通知</span>
              </el-menu-item>
            </el-tooltip>

            <el-tooltip effect="dark" content="系统设置" placement="bottom" :hide-after="100">
              <el-menu-item index="2" class="header-menu-item" @click="unfinished">
                <el-icon><Setting /></el-icon> <span class="header-menu-label">系统设置</span>
              </el-menu-item>
            </el-tooltip>

            <el-tooltip effect="dark" content="全屏缩放" placement="bottom" :hide-after="100">
              <el-menu-item index="3" class="header-menu-item" @click="handleFullScreen">
                <el-icon><FullScreen /></el-icon>
                <span class="header-menu-label">{{ isFullScreen ? '退出全屏' : '全屏模式' }}</span>
              </el-menu-item>
            </el-tooltip>
            <el-menu-item index="4" class="header-menu-item personal-center">
              <personal-center />
            </el-menu-item>
          </el-menu>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<!-- eslint-disable brace-style -->
<script lang="ts" setup>
import { Fold, Expand, ArrowRight, FullScreen, Setting, Message } from '@element-plus/icons-vue'
import PersonalCenter from '@/components/PersonalCenter.vue'
import { useStore } from 'vuex'
import { reactive, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import Notification from '@/utils/notification'

const store = useStore()

const changeMenuView = () => {
  store.commit('changeCollapseState')
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

const unfinished = () => {
  Notification({ text: '敬请期待', type: 'info', duration: 1000 })
}

const isFullScreen = ref(false)
const handleFullScreen = () => {
  const docElm: any = document.documentElement
  const doc: any = document
  isFullScreen.value = !isFullScreen.value

  if (isFullScreen.value) {
    // W3C
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen()
    }
    // FireFox
    else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen()
    }
    // Chrome等
    else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen()
    }
  } else {
    // W3C
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
    // FireFox
    else if (doc.mozCancelFullScreen!) {
      doc.mozCancelFullScreen()
    }
    // Chrome等
    else if (doc.webkitCancelFullScreen) {
      doc.webkitCancelFullScreen()
    }
    // IE11
    else if (doc.msExitFullscreen) {
      doc.msExitFullscreen()
    }
  }
}
</script>

<style lang="scss" scoped>
$header-color: #fff;

.header-nav-bar {
  padding: 0px !important;
  margin: 0px !important;
  background-color: $header-color;
  height: 60px;
  min-width: 250px;
}

.right-pan {
  .el-row {
    width: 100%;
    max-width: 100%;
  }
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
  width: 90px;
  height: 100%;
  border: none;
}

.header-button {
  padding-right: 10px;
  padding-left: 10px;
  background-color: $header-color !important;
  border: none;
}

@media (max-width: 500px) {
  .el-breadcrumb {
    display: none;
  }
}

@media (max-width: 550px) {
  .header-button {
    display: none;
  }
  .el-breadcrumb {
    margin-left: 1em;
  }
  .left-pan {
    flex: initial;
    max-width: initial;
  }
  .right-pan {
    flex: initial;
    max-width: 220px;
  }
  .personal-center {
    width: 100%;
  }
}

@media (max-width: 900px) {
  .header-menu-label {
    display: none;
  }
  .header-menu-item:not(:last-child) {
    width: 30px;
    height: 100%;
    border: none;
  }
}
</style>
