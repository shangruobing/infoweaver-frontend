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
          <el-form
            ref="ruleFormRef"
            :model="form"
            :rules="rules"
            label-position="right"
            status-icon
          >
            <el-row align="bottom" justify="space-between">
              <h1>登录</h1>
              <el-button @click="router.push('/register')" type="text">没有账号？去注册</el-button>
            </el-row>

            <el-form-item label="用户名称" prop="username">
              <el-input v-model="form.username" type="text" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="输入密码" prop="password">
              <el-input v-model="form.password" type="password" placeholder="请输入密码" />
            </el-form-item>

            <el-row align="bottom" justify="space-between" style="margin-bottom: 10px">
              <el-checkbox>记住我</el-checkbox>

              <el-button type="text">短信验证码登录</el-button>
            </el-row>

            <el-button @click="submitForm(ruleFormRef)" type="primary" style="width: 100%">
              立即登录
            </el-button>

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
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, onMounted, reactive } from 'vue'
import 'element-plus/theme-chalk/display.css'
import type { FormRules, FormInstance } from 'element-plus'

import service from '@/utils/request'
import Notification from '@/utils/notification'
import MultiWayLogin from './MultiWayLogin.vue'

const store = useStore()
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const form = reactive({
  username: '',
  password: ''
})

onMounted(() => {
  Notification({ text: '用户名：测试用户，密码：123456', type: 'info' })
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      login()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const login = async () => {
  const api = 'login/'
  const data = {
    username: form.username,
    password: form.password
  }
  try {
    const response = await service.post(api, data)
    const authorization = response.data.token
    const username = response.data.username

    Notification({ text: '登录成功', type: 'success' })
    store.commit('loginSuccess', username)
    localStorage.setItem('username', username)
    localStorage.setItem('authorization', authorization)

    router.push('/content/')
  } catch (error) {
    Notification({ text: '用户名或密码错误！', type: 'error' })
    console.log(error)
  }
}

const rules = reactive<FormRules>({
  username: [{ required: true, message: 'Please input username', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input password', trigger: 'blur' }]
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
