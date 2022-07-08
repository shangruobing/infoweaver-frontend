<template>
  <div class="header-bar">
    <el-row align="middle" justify="space-between" style="width: 100%">
      <el-col :span="6" style="text-align: left; height: 60px">
        <el-popover :width="150" popper-style="text-align: center; padding: 10px;">
          <template #reference>
            <img src="@/assets/infoweaver/黑横.svg" width="160" height="60"
          /></template>
          <template #default><p>编织信息 共赢未来🎉</p></template>
        </el-popover>
      </el-col>

      <el-col :span="18" style="text-align: right; height: 60px">
        <el-row align="middle" justify="end" style="width: 100%">
          <el-input
            placeholder="Search"
            :prefix-icon="Search"
            style="width: 20%; padding-right: 10px"
            class="hidden-sm-and-down"
          />
          <el-menu
            mode="horizontal"
            active-text-color="#000000"
            background-color="f0f2f4"
            :ellipsis="false"
            router
          >
            <el-menu-item class="header-menu-item hidden-xs-only">指南</el-menu-item>
            <el-menu-item class="header-menu-item hidden-xs-only">资源</el-menu-item>
            <el-menu-item index="login" class="header-menu-item hidden-xs-only">登录</el-menu-item>
            <el-menu-item index="register" class="header-menu-item hidden-xs-only">
              注册
            </el-menu-item>
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
  position: fixed;
  width: 100vw;
  padding-left: 15px;
  padding-right: 0;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 7px 5px -5px #f2f4f5;
  height: 60px;
}

.header-menu-item {
  min-width: 70px;
  height: 60px;
  border: none;
}

:deep(.el-menu--horizontal > .el-menu-item.is-active) {
  height: 60px;
  border: none;
}

.el-menu--horizontal {
  border: none;
  margin-right: 20px;
}
</style>
