<template>
  <div class="register">
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
            <span style="font-size: large; font-weight: bold">终于等到你 欢迎加入</span>
          </div>
          <img src="@/assets/material/欢迎加入.svg" width="300" height="300" />
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
              <h1>注册</h1>
              <el-button @click="router.push('/login')" type="text">已有账号？去登录</el-button>
            </el-row>

            <el-form-item label="用户名称" prop="username">
              <el-input v-model="form.username" type="text" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="输入密码" prop="password">
              <el-input v-model="form.password" type="password" placeholder="请输入密码" />
            </el-form-item>
            <el-form-item label="再次输入" prop="repeat">
              <el-input v-model="form.repeat" type="password" placeholder="请再次输入密码" />
            </el-form-item>
            <el-form-item>
              <el-checkbox>我已阅读并同意相关条款</el-checkbox>
            </el-form-item>

            <el-form-item>
              <el-button @click="submitForm(ruleFormRef)" type="primary" style="width: 100%">
                立即注册
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { FormRules, FormInstance } from 'element-plus'

import Notification from '@/utils/notification'
import service from '@/utils/request'

const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const form = reactive({
  username: '',
  password: '',
  repeat: ''
})

onMounted(() => {
  Notification({
    text: '注册功能已开放，欢迎加入',
    type: 'success',
    duration: 10000
  })
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      register()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const register = async () => {
  const api = 'user/'
  const data = {
    username: form.username,
    password: form.password
  }
  try {
    console.log(data)
    const response = await service.post(api, data)
    console.log(response)
    Notification({
      text: '注册成功！欢迎您' + form.username,
      duration: 5000
    })
    router.push('/login')
  } catch (error: any) {
    if (error.response.data.username[0] === '用户 with this 用户名 already exists.') {
      Notification({
        text: '糟糕用户名已经存在了，换一个吧',
        duration: 3000
      })
      form.username = ''
    }
    console.log(error)
  }
}

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (form.repeat !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('repate', () => null)
    }
    callback()
  }
}

const validateRepeat = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== form.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  username: [{ required: true, message: 'Please input username', trigger: 'blur' }],
  password: [
    {
      required: true,
      trigger: 'change',
      validator: validatePassword
    },
    { min: 6, max: 20, message: 'Length should be 6 to 20', trigger: 'blur' }
  ],
  repeat: [
    {
      required: true,
      trigger: 'change',
      validator: validateRepeat
    },
    { min: 6, max: 20, message: 'Length should be 6 to 20', trigger: 'blur' }
  ]
})
</script>

<style lang="scss" scoped>
.register {
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
