<template>
  <el-empty description="404 Not Found 你的页面走丢啦" :image-size="400">
    <template #image>
      <img src="@/assets/exception/notfound.svg" />
    </template>
    <router-link to="/"> <el-button type="primary">点我回到首页吧!</el-button></router-link>
  </el-empty>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
