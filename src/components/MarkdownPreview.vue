<template>
  <div class="container">
    <!-- <h1>Markdown Editor</h1> -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input v-model="markdown" type="textarea" placeholder="Please input" resize="none" />
      </el-col>
      <el-col :span="12" class="preview-area-border">
        <div v-html="markdownToHtml" class="preview-area"></div
      ></el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import * as marked from 'marked'
import { ref, computed } from 'vue'

const markdown = ref(
  `# NFQA前端开发
NFQA前端部分，采用Vue3和Element-Plus组件库编写，实现聊天机器人和通知文件管理系统

#### 主要依赖
- Vue 3.2.25
- TypeScript 4.6.2
- Element-Plus 2.0.1
- vue3-beautiful-chat 3.2.0
- docx-preview 0.1.8

#### 安装教程
1.  安装 npm install
2.  运行 npm run dev
3.  构建 npm run build

#### 使用说明
1.  准备好通知文件(docx)格式
2.  启动Neo4j服务
3.  使用数据库端的ipynb文件将数据导入数据库(MySQL和Neo4j)
4.  启动Django服务器
5.  使用Vite打包启动Vue
`
)
const markdownToHtml = computed(() => marked.parse(markdown.value))
</script>

<style lang="scss" scoped>
$column-height: 95%;

.container {
  width: 95%;
  height: 97vh;
  margin: auto;
  text-align: center;
  min-width: 350px;
  max-height: 100%;
  .el-row {
    height: 90%;
  }
  .el-col {
    height: $column-height;
  }
}

:deep(.el-textarea) {
  width: 100%;
  height: 100%;
  textarea {
    height: 100%;
  }
}

.preview-area-border {
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
}

.preview-area {
  width: 100%;
  height: $column-height;
  text-align: left;
  font-size: 0.9em;
}

@media (max-width: 600px) {
  .el-row {
    display: initial;
  }
  .el-col {
    max-width: 100%;
    margin: 0 1.5em 1em 1.5em;
  }
  .preview-area {
    padding-top: 1em;
  }
}
</style>
