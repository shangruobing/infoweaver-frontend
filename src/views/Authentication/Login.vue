<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <el-row align="middle" justify="space-between" style="width: 100%">
          <el-col :span="11" class="left-pan">
            <img src="@/assets/infoweaver/黑横.svg" width="160" height="60" />
            <h3>致力于研发简洁、高效的问答机器人</h3>
            <img src="@/assets/material/检索站点.svg" width="300" height="300" />
          </el-col>

          <el-col :span="13" class="right-pan">
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
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { h, reactive } from 'vue'
// import Axios from 'axios'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex'
import MultiWayLogin from './MultiWayLogin.vue'

const router = useRouter()
const form = reactive({
  username: '',
  password: ''
})
const store = useStore()
const login = async () => {
  // const api = 'http://127.0.0.1:8000/api/user/'
  // const data = {
  //   username: form.username,
  //   password: form.password
  // }
  try {
    // const response = await Axios.post(api, data)
    if (form.username === '若水' && form.password === '123456') {
      ElNotification.success({
        message: h('i', { style: 'color: teal' }, '登录成功！'),
        position: 'top-right',
        duration: 1500
      })
      store.commit('loginSuccess', form.username)

      router.push('/')
      // router.push('/content/')
    } else {
      ElNotification.error({
        message: h('i', { style: 'color: teal' }, '用户名或密码错误！'),
        position: 'top-right',
        duration: 1500
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const goRegister = () => {
  router.push('/register')
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
