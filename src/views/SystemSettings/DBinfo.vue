<template>
  <el-timeline>
    <el-timeline-item center timestamp="2022-02-01" placement="top" color="#409EFF">
      正式开始开发
    </el-timeline-item>
    <el-timeline-item center timestamp="2022-06-01" placement="top" color="#409EFF">
      第一阶段开发完成 实现基本功能 部署上服务器
    </el-timeline-item>
    <el-timeline-item center timestamp="2022-07-01" placement="top" color="#0bbd87">
      <el-card class="box-card">
        <h2>第二阶段开发正式开始🎉</h2>
        <ul class="color-ul">
          <li><span>全面适配HTTPS</span></li>
          <li><span>使用Nginx进行反向代理、动静分离</span></li>
          <li><span>进一步进行完善</span></li>
          <li><span>响应式布局</span></li>
          <li><span>微信小程序开发</span></li>
        </ul>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
* {
  text-align: left;
}

.color-ul {
  li {
    padding-bottom: 20px;
    color: #409eff;

    span {
      color: #303131;
    }
  }
}

.box-card {
  width: 350px;
}
</style>
