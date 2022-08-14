<template>
  <el-empty description="404 Not Found 你的页面走丢啦" :image-size="400">
    <template #image>
      <img src="@/assets/exception/notfound.svg" />
    </template>
    <router-link to="/"> <el-button type="primary">点我回到首页吧!</el-button></router-link>
  </el-empty>
</template>

<style>
a {
  text-decoration: none;
}

.el-empty__image {
  max-width: 100%;
  max-height: 100%;
}
</style>
