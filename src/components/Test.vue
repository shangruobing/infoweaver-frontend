<template>
    <el-button type="text" @click="centerDialogVisible = true">Click to open the Dialog</el-button>

    <el-dialog v-model="centerDialogVisible" title="发布活动" center width="40%">
        <upload />
        <!-- <span
      >It should be noted that the content will not be aligned in center by
      default</span
    > -->
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="centerDialogVisible = false" round>发布</el-button>

                <el-button @click="centerDialogVisible = false" round>取消</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import upload from "./UploadFileForm.vue";

const centerDialogVisible = ref(false);
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
