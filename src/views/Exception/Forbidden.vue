<template>
  <el-empty description="403 ForBidden 你没有权限哦" :image-size="400">
    <template #image>
      <img src="@/assets/exception/forbidden.svg" />
    </template>
    <router-link to="/"> <el-button type="primary">点我回到首页吧!</el-button></router-link>
  </el-empty>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
