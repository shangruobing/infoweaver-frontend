<template>
    <el-form :model="form">
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="通知名称">
                    <el-input v-model="form.name" placeholder="请输入通知名称" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="活动地点">
                    <el-select v-model="form.region" placeholder="请选择活动地点">
                        <el-option label="呈贡校区怡园" value="怡园" />
                        <el-option label="呈贡校区憬园" value="憬园" />
                        <el-option label="呈贡校区恒园" value="恒园" />
                        <el-option label="呈贡校区恬园" value="恬园" />
                        <el-option label="莲华校区" value="莲华" />
                        <el-option label="新迎校区" value="新迎" />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="活动日期">
                    <el-date-picker v-model="form.date1" type="date" placeholder="请选择日期" style="width: 100%" />
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="通知对象">
                    <el-select v-model="form.name" placeholder="请选择通知对象">
                        <el-option label="全体师生" value="全体师生" />
                        <el-option label="教师" value="教师" />
                        <el-option label="学生" value="学生" />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="活动时间">
                    <el-time-picker v-model="form.date2" placeholder="请选择时间" style="width: 100%" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="活动类型">
                    <el-select v-model="form.type" placeholder="请选择活动类型">
                        <el-option label="创新活动" value="创新活动" />
                        <el-option label="文体活动" value="文体活动" />
                        <el-option label="学科竞赛" value="学科竞赛" />
                        <el-option label="科研活动" value="科研活动" />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="通知备注">
                    <el-input v-model="form.desc" type="textarea" :rows="1" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item>
                    <el-upload
                        action="http://127.0.0.1:8000/"
                        ref="uploadRef"
                        :auto-upload="false"
                        :limit="1"
                        :show-file-list="false"
                        :on-change="upload_success"
                    >
                        <el-button type="text" class="upload">
                            上传附件<el-icon class="el-icon--right"><upload /> </el-icon>
                        </el-button>
                    </el-upload>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">发布</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { h, ref, reactive } from "vue";
import { ElNotification } from "element-plus";
import { Upload } from "@element-plus/icons-vue";

const form = reactive({
    name: "",
    region: "",
    date1: "",
    date2: "",
    delivery: false,
    type: [],
    resource: "",
    desc: "",
});

const onSubmit = () => {
    uploadRef.value!.submit();
    console.log("form submit!");
    console.log(form);
};

const uploadRef = ref();

const upload_success = () => {
    ElNotification.success({
        message: h("i", { style: "color: teal" }, "文件已成功上传！"),
        position: "top-right",
    });
};
</script>

<style>
.el-form-item__label {
    font-weight: bold;
}
.upload {
    color: #606266;
    font-weight: bold;
}
</style>
