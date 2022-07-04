<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <el-row align="middle" justify="space-between" style="width: 100%">
          <el-col :span="11" class="left-pan">
            <img src="@/assets/黑横.svg" width="160" height="60" />
            <h3>致力于研发简洁、高效的问答机器人</h3>
            <img src="@/assets/检索站点.svg" width="300" height="300" />
          </el-col>

          <el-col :span="13" class="right-pan">
            <el-form label-position="right">
              <el-row align="bottom" justify="space-between">
                <h1>注册</h1>
                <el-button @click="goLogin" type="text">已有账号？去登录</el-button>
              </el-row>

              <el-form-item label="用户名称">
                <el-input v-model="form.username" type="text" placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item label="输入密码">
                <el-input v-model="form.password" type="password" placeholder="请输入密码" />
              </el-form-item>
              <el-form-item label="再次输入">
                <el-input v-model="form.repeat" type="password" placeholder="请再次输入密码" />
              </el-form-item>
              <el-form-item>
                <el-checkbox>我已阅读并同意相关条款</el-checkbox>
              </el-form-item>

              <el-form-item>
                <el-button @click="register" type="primary" style="width: 100%">立即注册</el-button>
              </el-form-item>

              <div class="right-footer">
                <el-divider>其他方式登录</el-divider>
                <el-row align="middle" justify="space-between">
                  <el-icon :size="25">
                    <img src="@/assets/qq.svg" width="25" height="25" />
                  </el-icon>

                  <el-icon :size="25">
                    <img src="@/assets/wechat.svg" width="25" height="25" />
                  </el-icon>
                  <el-icon :size="25">
                    <img src="@/assets/github.svg" width="25" height="25" />
                  </el-icon>
                  <el-icon :size="25">
                    <img src="@/assets/gitee.svg" width="25" height="25" />
                  </el-icon>
                </el-row>
              </div>
            </el-form>
          </el-col>
        </el-row> </el-card
    ></el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { h, reactive } from 'vue'
import Axios from 'axios'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
const router = useRouter()
const form = reactive({
  username: '',
  password: '',
  repeat: ''
})
const register = async () => {
  ElNotification.success({
    message: h('i', { style: 'color: teal' }, '注册成功！'),
    position: 'top-right'
  })
  router.push('/login')

  const api = 'http://127.0.0.1:8000/api/user/'
  const data = {
    username: form.username,
    password: form.password
  }

  try {
    const response = await Axios.post(api, data)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
const goLogin = () => {
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.el-container {
  background-color: #f0f2f4;
  width: 100%;
  height: 100%;
}
.el-main {
  margin: 8%;

  position: relative;
}
.left-pan {
  padding-left: 8%;

  text-align: left;

  border-right: 3px solid #f0f2f4;
}
.right-pan {
  width: 80%;
  padding-left: 50px;
}
.el-form {
  width: 80%;
}

.right-footer {
  margin-top: 40px;
}
</style>
