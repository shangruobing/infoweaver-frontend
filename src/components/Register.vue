<template>
    <el-card class="box-card">
        <el-form label-position="right">
            <el-form-item label="用户名称">
                <el-input v-model="form.username" type="text" placeholder="请输入用户名" autocomplete="off" />
            </el-form-item>
            <el-form-item label="输入密码">
                <el-input v-model="form.password" type="password" placeholder="请输入密码" autocomplete="off" />
            </el-form-item>
            <el-form-item label="再次输入">
                <el-input v-model="form.repeat" type="password" placeholder="请再次输入密码" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户姓名">
                <el-input v-model="form.name" type="text" placeholder="请输入姓名" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户年龄">
                <el-input v-model="form.age" type="number" placeholder="请输入年龄" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户类型">
                <el-select v-model="form.role" placeholder="请选择用户类型">
                    <el-option value="请选择用户类型" disabled selected>请选择用户类型</el-option>
                    <el-option value="学生">学生</el-option>
                    <el-option value="教师">教师</el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="register" type="primary">注册</el-button>
                <el-button @click="goLogin">已有账号，去登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import Axios from "axios";
const form = reactive({
    username: "",
    password: "",
    repeat: "",
    name: "",
    age: "",
    role: "",
});
const register = async () => {
    const api = "http://127.0.0.1:8000/api/user/";
    let data = {
        username: form.username,
        password: form.password,
        name: form.name,
        role: form.role === "学生" ? 1 : 0,
        age: form.age,
    };
    if (form.password !== form.repeat) {
        alert("两次密码不一致");
    } else {
        try {
            const response = await Axios.post(api, data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
};
const goLogin = () => {
    console.log("进入Logo");
};
</script>

<style lang="scss" scoped>
.box-card {
    width: 45%;
    position: absolute;
    top: 10%;
    right: 5%;
    margin-top: 50px;
    padding-right: 20px;
    margin-left: 50px;
}
</style>
