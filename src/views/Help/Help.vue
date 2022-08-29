<template>
  <el-empty :image-size="400">
    <template #image>
      <img src="@/assets/exception/Help.svg" />
    </template>

    <template #description>
      <span class="row">
        <p>出现问题了? 别急, 联系我们</p>
        <el-link href="mailto:shangruobing29@163.com" title="author-email" :underline="false">
          <el-icon :size="20"><message /></el-icon>
        </el-link>
      </span>
    </template>
  </el-empty>
</template>

<script setup>
import { Message } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.row {
  display: flex;
  align-items: center;

  :last-child {
    height: 100%;
    margin-left: 1px;
  }
}
</style>
