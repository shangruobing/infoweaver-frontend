<template>
    <el-upload
        class="upload-demo"
        drag
        action="http://127.0.0.1:8000/"
        multiple
        ref="uploadRef"
        :auto-upload="false"
        limit="1"
    >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>

        <div class="el-upload__text">拖动文件至此<em>或者点击上传</em></div>
    </el-upload>

    <el-button class="ml-3" type="primary" @click="submitUpload"> 确认上传</el-button>
</template>

<script setup lang="ts">
import { UploadFilled } from "@element-plus/icons-vue";
import { ref } from "vue";

const uploadRef = ref();

const submitUpload = () => {
    uploadRef.value!.submit();
};
</script>
