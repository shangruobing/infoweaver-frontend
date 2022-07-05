<template>
  <el-dropdown>
    <el-avatar
      v-if="isLogin"
      src="https://portrait.gitee.com/uploads/avatars/user/3474/10422230_shangruobing_1644648546.png!avatar200"
    />
    <el-avatar v-else> <img src="@/assets/home/头像.svg" /></el-avatar>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item v-if="isLogin && isHome" @click="router.push('/content/')">
          进入管理端
        </el-dropdown-item>
        <el-dropdown-item>帮助</el-dropdown-item>
        <el-dropdown-item disabled>禁用设置</el-dropdown-item>

        <el-dropdown-item v-if="isLogin" divided @click="logout">退出登录</el-dropdown-item>
        <el-dropdown-item v-else @click="router.push('/login/')">立即登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

defineProps({
  isHome: Boolean
})

const router = useRouter()
const store = useStore()
const isLogin = ref(store.getters.isLogin)

const logout = () => {
  isLogin.value = false
  store.commit('logout')
  router.push('/')
}
</script>
