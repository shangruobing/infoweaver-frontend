<template>
  <el-empty :image-size="400">
    <template #image>
      <img src="@/assets/exception/Help.svg" />
    </template>
    <router-link to="/"> <el-button type="primary">点我回到首页吧!</el-button></router-link>
    <template #description>
      <span class="row">
        <p>出现问题了? 别急, 联系我们</p>
        <el-link href="mailto:shangruobing29@163.com">
          <el-icon :size="20">
            <message />
          </el-icon>
        </el-link>
      </span>
    </template>
  </el-empty>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.row {
  display: flex;
  align-items: center;
  :last-child {
    margin-left: 1px;
    height: 100%;
  }
}
</style>

<script setup>
import { Message } from '@element-plus/icons'
</script>
