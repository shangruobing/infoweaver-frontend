<template>
  <div class="header-bar">
    <el-row align="middle" justify="space-between" style="width: 100%">
      <el-col :span="4">
        <el-popover :width="160" popper-style="text-align: center; padding: 10px;">
          <template #reference>
            <img src="@/assets/infoweaver/黑横.svg" width="160" height="60" />
          </template>
          <template #default>编织信息 共赢未来🎉</template>
        </el-popover>
      </el-col>

      <el-col :span="20">
        <el-row align="middle" justify="end" style="width: 100%">
          <el-input placeholder="Search" :prefix-icon="Search" />
          <el-menu
            mode="horizontal"
            active-text-color="#000000"
            background-color="f0f2f4"
            :ellipsis="false"
            router
          >
            <el-menu-item index="docs" class="header-menu-item hidden-xs-only">指南</el-menu-item>
            <el-menu-item index="" class="header-menu-item hidden-xs-only">资源</el-menu-item>
            <el-menu-item index="login" class="header-menu-item hidden-xs-only">登录</el-menu-item>
            <el-menu-item index="register" class="header-menu-item hidden-xs-only"
              >注册</el-menu-item
            >
            <el-menu-item index="" class="header-menu-item">
              <personal-center isHome />
            </el-menu-item>
          </el-menu>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import PersonalCenter from '@/components/PersonalCenter.vue'
import 'element-plus/theme-chalk/display.css'
</script>

<style lang="scss" scoped>
.header-bar {
  position: sticky;
  width: 100vw;
  padding-left: 1em;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 7px 5px -5px #f2f4f5;
  height: 60px;
}

.header-menu-item {
  min-width: 70px;
  width: 70px;
  height: 60px;
  border: none;
}

:deep(.el-menu--horizontal > .el-menu-item.is-active) {
  height: 60px;
  border: none;
}

.el-menu--horizontal {
  border: none;
}

.el-col {
  text-align: left;
  height: 60px;
}

.el-input {
  width: 20%;
  margin-right: 1em;
  min-width: 120px;
}
@media (max-width: 400px) {
  .el-input {
    display: none;
  }
}
</style>
