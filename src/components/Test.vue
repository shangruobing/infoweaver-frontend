<template>
  <h1>这是测试页面</h1>
  <div>
    <el-icon>
      <edit></edit>
    </el-icon>
    <!-- Or use it independently without derive attributes from parent -->
    <edit></edit>

    <el-icon><download /></el-icon>
  </div>
</template>


<script>
import { Edit,Download } from "@element-plus/icons-vue";

export default {
  components: {
    Edit,Download
  },
  setup() {},
};
</script>