<template>
  <div class="footer-pan">
    <el-link
      target="_blank"
      href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=53011402000584"
      style="margin-right: 20px"
      :underline="false"
    >
      <img src="@/assets/home/beian.png" />
      滇公网安备 53011402000584号
    </el-link>

    <el-link href="https://beian.miit.gov.cn/" target="_blank" :underline="false">
      滇ICP备2022003697号-1
    </el-link>
    <p style="font-size: 14px; color: #606266;">
      All Rights Reserved Ruobing Shang 版权所有
    </p>
    <my-robot />
  </div>
</template>

<style lang="scss" scoped>
.footer-pan {
  background-color: #f2f4f5;
}
</style>
