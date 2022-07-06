<template>
  <el-dropdown>
    <el-avatar>
      <img
        v-if="store.getters.isLogin"
        src="https://portrait.gitee.com/uploads/avatars/user/3474/10422230_shangruobing_1644648546.png!avatar200"
      />
      <img v-else src="@/assets/home/头像.svg" />
    </el-avatar>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-if="store.getters.isLogin">个人中心</el-dropdown-item>
        <el-dropdown-item v-if="store.getters.isLogin && isHome" @click="router.push('/content/')">
          进入管理端
        </el-dropdown-item>
        <el-dropdown-item @click="router.push('/help/')">帮助</el-dropdown-item>
        <el-dropdown-item disabled>禁用设置</el-dropdown-item>

        <el-dropdown-item v-if="store.getters.isLogin" divided @click="logout"
          >退出登录</el-dropdown-item
        >
        <el-dropdown-item v-else @click="router.push('/login/')">立即登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

defineProps({
  isHome: Boolean
})
const router = useRouter()
const store = useStore()

onMounted(() => {
  const username = localStorage.getItem('username')
  if (username) {
    store.commit('loginSuccess', username)
  }
})

const logout = () => {
  store.commit('logout')
  localStorage.clear()
  router.push('/')
}
</script>
