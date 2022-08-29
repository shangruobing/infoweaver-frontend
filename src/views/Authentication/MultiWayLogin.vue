<template>
  <el-divider><span>其他方式登录</span></el-divider>
  <el-row align="middle" justify="space-between">
    <el-icon :size="25">
      <img src="@/assets/icon/qq.svg" width="25" height="25" />
    </el-icon>

    <el-icon :size="25">
      <img src="@/assets/icon/wechat.svg" width="25" height="25" />
    </el-icon>
    <el-icon :size="25">
      <img src="@/assets/icon/github.svg" width="25" height="25" />
    </el-icon>
    <el-icon :size="25">
      <img src="@/assets/icon/gitee.svg" width="25" height="25" />
    </el-icon>
  </el-row>
</template>

<style>
span {
  font-size: 1em;
}

.el-divider__text {
  padding: 1em;
}
</style>
