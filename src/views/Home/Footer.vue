<template>
  <div class="footer-pan">
    <el-link
      target="_blank"
      href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=53011402000584"
      style="margin-right: 1em"
      :underline="false"
    >
      <img src="@/assets/home/beian.png" />
      <span class="text">公网安备 53011402000584号</span>
    </el-link>

    <el-link href="https://beian.miit.gov.cn/" target="_blank" :underline="false">
      <span class="text"> 滇ICP备2022003697号-1</span>
    </el-link>
    <span class="text" style=" display: block; margin: 0;font-size: 14px; color: #606266;">
      All Rights Reserved Ruobing Shang 版权所有
    </span>
  </div>
</template>

<style lang="scss" scoped>
.footer-pan {
  background-color: #f2f4f5;
}

.text {
  font-size: 1em;
  line-height: 1.5em;
}
</style>
