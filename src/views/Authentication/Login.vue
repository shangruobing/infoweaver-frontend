<template>
  <div class="login">
    <el-card class="box-card">
      <el-row align="middle" justify="space-between" style="width: 100%" :gutter="20">
        <el-col class="left-pan">
          <div style="display: flex; align-items: center">
            <img
              src="@/assets/infoweaver/logo.svg"
              width="60"
              height="60"
              style="margin-right: 20px"
            />
            <span style="font-size: large; font-weight: bold">欢迎回来 我一直在等你</span>
          </div>
          <img src="@/assets/material/检索站点.svg" width="300" height="300" />
        </el-col>
        <el-col class="right-pan">
          <el-form label-position="right">
            <el-row align="bottom" justify="space-between">
              <h1>登录</h1>
              <el-button @click="goRegister" type="text">没有账号？去注册</el-button>
            </el-row>

            <el-form-item label="用户名称">
              <el-input v-model="form.username" type="text" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="输入密码">
              <el-input v-model="form.password" type="password" placeholder="请输入密码" />
            </el-form-item>

            <el-row align="bottom" justify="space-between" style="margin-bottom: 10px">
              <el-checkbox>记住我</el-checkbox>

              <el-button type="text">短信验证码登录</el-button>
            </el-row>

            <el-button @click="login" type="primary" style="width: 100%">立即登录</el-button>

            <div class="right-footer">
              <MultiWayLogin />
            </div>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { h, onMounted, reactive } from 'vue'
import Axios from 'axios'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex'
import MultiWayLogin from './MultiWayLogin.vue'
import 'element-plus/theme-chalk/display.css'
import { getHttp } from '@/utils/django-http'

const http = getHttp()

const router = useRouter()
const form = reactive({
  username: '',
  password: ''
})
const store = useStore()
const login = async () => {
  const api = http + 'login/'
  const data = {
    username: form.username,
    password: form.password
  }
  try {
    const response = await Axios.post(api, data)
    console.log(response)
    const authorization = response.data.token
    const username = response.data.username

    ElNotification.success({
      message: h('i', { style: 'color: teal' }, '登录成功！'),
      position: 'top-right',
      duration: 1500
    })
    store.commit('loginSuccess', username)
    localStorage.setItem('username', username)
    localStorage.setItem('authorization', authorization)

    router.push('/content/')
  } catch (error) {
    ElNotification.error({
      message: h('i', { style: 'color: teal' }, '用户名或密码错误！'),
      position: 'top-right',
      duration: 1500
    })
    console.log(error)
  }
}

const goRegister = () => {
  router.push('/register')
}

onMounted(() => {
  ElNotification({
    message: h('i', { style: 'color: teal' }, '测试用户名：若水，密码：010209'),
    position: 'top-right',
    type: 'warning',
    duration: 10000
  })
})
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
}

.box-card {
  margin: auto;
  max-height: 100%;
}

.left-pan {
  flex: 1;
  width: 100%;
  text-align: left;
  border-right: 3px solid #f0f2f4;
}

.right-pan {
  flex: 1;
  width: 100%;
  text-align: right;
}

.el-form {
  width: 100%;
}

.right-footer {
  margin-top: 2em;
}

img {
  max-width: 100%;
  max-height: 100%;
}

@media (max-width: 500px) {
  .left-pan {
    display: none;
  }
  .box-card {
    width: 100%;
  }
}
</style>
