<template>
  <el-empty description="403 ForBidden 你没有权限哦" :image-size="400">
    <template #image>
      <img src="@/assets/exception/forbidden.svg" />
    </template>
  </el-empty>
</template>

<style>
.el-empty__image {
  max-width: 100%;
  max-height: 100%;
}
</style>
