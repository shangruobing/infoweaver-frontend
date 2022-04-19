<template>
    <el-form :model="form" >
        <el-form-item label="通知名称">
            <el-col :span="10">
                <el-input v-model="form.name" />
            </el-col>
        </el-form-item>

        <el-form-item label="活动时间">
            <el-col :span="4">
                <el-date-picker
                    v-model="form.date1"
                    type="date"
                    placeholder="请选择日期"
                    style="width: 100%"
                />
            </el-col>

            <el-col :span="1" class="text-center">
                <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="4">
                <el-time-picker v-model="form.date2" placeholder="请选择时间" style="width: 100%" />
            </el-col>
        </el-form-item>

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

        <el-form-item label="立即发布">
            <el-switch v-model="form.delivery" />
        </el-form-item>

        <el-form-item label="活动类型">
            <el-checkbox-group v-model="form.type">
                <el-checkbox label="创新创业" name="type" />
                <el-checkbox label="文体活动" name="type" />
                <el-checkbox label="学科竞赛" name="type" />
                <el-checkbox label="科研活动" name="type" />
            </el-checkbox-group>
        </el-form-item>

        <el-form-item label="通知对象">
            <el-radio-group v-model="form.resource">
                <el-radio label="全体师生" />
                <el-radio label="教师" />
                <el-radio label="学生" />
            </el-radio-group>
        </el-form-item>

        <el-form-item label="通知备注">
            <el-col :span="10">
                <el-input v-model="form.desc" type="textarea" />
            </el-col>
        </el-form-item>

        <el-form-item label="上传附件">
            <el-upload
                class="upload-demo"
                drag
                action="http://127.0.0.1:8000/"
                multiple
                ref="uploadRef"
                :auto-upload="false"
                :limit="1"
            >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>

                <div class="el-upload__text">
                    拖动文件至此<em>或者点击上传</em> <br /><small>一次只能上传一个文件哦</small>
                </div>
                -->
            </el-upload>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">发布</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import { ref } from "vue";

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
</script>
