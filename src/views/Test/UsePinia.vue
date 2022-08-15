<template>
  <h3>{{ store.isLogin }}</h3>
  <h3>{{ store.userInfo }}</h3>

  <h3>{{ isLogin }}</h3>
  <h3>{{ userInfo }}</h3>

  <el-button @click="handleClick1">login</el-button>
  <el-button @click="handleClick2">settt</el-button>
  <el-button @click="handleClick3"> setInfo </el-button>
  <el-button @click="handleClick4">logout</el-button>
</template>

<script lang="ts" setup>
import { mainStore } from '@/store/usepinia'
import { storeToRefs } from 'pinia'

const store = mainStore()
const { isLogin, userInfo } = storeToRefs(store)

const handleClick1 = () => {
  store.isLogin = true
}

const handleClick2 = () => {
  const userInfo = { username: 'aubu', auth: 'sss', type: 0, avatarURL: '222.com' }
  store.setUserInfo(userInfo)
}

const handleClick3 = () => {
  store.$patch((state) => {
    state.isLogin = true
    state.userInfo.username = '2'
    state.userInfo.type = 0
  })
}

const handleClick4 = () => {
  store.logout()
}
</script>
<style scoped>
.yellow-border {
  border: 10px solid greenyellow;
  margin: 20px;
}

body {
  text-align: center;
}
</style>
