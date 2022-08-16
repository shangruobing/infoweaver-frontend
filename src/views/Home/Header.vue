<template>
  <div class="header-bar">
    <el-row align="middle" justify="space-between" style="width: 100%">
      <el-col :span="4">
        <el-popover :width="160" popper-style="text-align: center; padding: 10px;">
          <template #reference>
            <img src="@/assets/infoweaver/黑横.svg" width="160" height="60" title="logo" />
          </template>
          <template #default>编织信息 共赢未来🎉</template>
        </el-popover>
      </el-col>

      <el-col :span="20">
        <el-row align="middle" justify="end" style="width: 100%">
          <el-select v-model="value" filterable placeholder="Search" @change="handleChange(value)">
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-menu
            mode="horizontal"
            active-text-color="#000000"
            background-color="f0f2f4"
            :ellipsis="false"
            router
          >
            <el-menu-item index="guide" class="header-menu-item">指南</el-menu-item>
            <el-menu-item index="docs" class="header-menu-item">资源</el-menu-item>
            <el-menu-item index="login" class="header-menu-item">登录</el-menu-item>
            <el-menu-item index="register" class="header-menu-item">注册</el-menu-item>
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

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const value = ref('')
const options = [
  {
    value: 'login',
    label: '登录'
  },
  {
    value: 'register',
    label: '注册'
  },
  {
    value: 'content/',
    label: '进入系统'
  },
  {
    value: 'guide',
    label: '指南'
  },
  {
    value: 'docs',
    label: '资源'
  },
  {
    value: 'help',
    label: '帮助'
  }
]

const handleChange = (value: string) => {
  router.push(value)
}
</script>

<style lang="scss" scoped>
.header-bar {
  position: sticky;
  width: 100vw;
  padding-left: 0.5em;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 7px 5px -5px #f2f4f5;
  height: 60px;
  min-width: 300px;
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

.el-select {
  width: 20%;
  margin-right: 1em;
  min-width: 120px;
}

@media (max-width: 660px) {
  .header-menu-item:not(:last-child) {
    display: none;
  }
}

@media (max-width: 400px) {
  .el-select {
    display: none;
  }
}
</style>
