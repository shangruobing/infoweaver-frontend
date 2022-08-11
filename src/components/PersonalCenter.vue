<!-- eslint-disable vue/no-v-model-argument -->
<template>
  <el-dropdown>
    <el-avatar>
      <img v-if="showAvatar" :src="avatarURL" @error="avatarError()" />
      <img v-else src="@/assets/home/头像.svg" />
    </el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-if="store.getters.isLogin" @click="dialogVisible = true">
          个人中心
        </el-dropdown-item>
        <el-dropdown-item v-if="store.getters.isLogin && isHome" @click="router.push('/content/')">
          进入管理端
        </el-dropdown-item>
        <el-dropdown-item @click="router.push('/content/help/')">帮助</el-dropdown-item>

        <el-dropdown-item v-if="store.getters.isLogin" divided @click="logout">
          退出登录
        </el-dropdown-item>
        <el-dropdown-item v-else @click="router.push('/login/')">登录</el-dropdown-item>
        <el-dropdown-item v-if="!store.getters.isLogin" @click="router.push('/register/')">
          注册
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <personal-settings v-model:visible="dialogVisible" @close="close" style="position: absolute" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import service from '@/utils/request'
import PersonalSettings from '@/components/PersonalSettings.vue'

const dialogVisible = ref(false)

const close = () => {
  dialogVisible.value = false
}

defineProps({
  isHome: Boolean
})

const router = useRouter()
const store = useStore()
const showAvatar = ref(store.getters.isLogin)
const avatarURL = ref('')

onMounted(async () => {
  const username = localStorage.getItem('username')
  if (username) {
    store.commit('loginSuccess', username)
  }
  const avatar = localStorage.getItem('avatar')
  if (avatar) {
    avatarURL.value = avatar
  } else {
    try {
      const response = await service.get('avatar')
      const domain = response.config.baseURL?.split('/api/')[0]
      // https://www.infoweaver.cloud + /media/avatar/XXX.jpeg
      const avatar = response.data
      avatarURL.value = domain + avatar
      localStorage.setItem('avatar', avatarURL.value)
    } catch (error) {
      console.log(error)
    }
  }
})

const logout = () => {
  store.commit('logout')
  localStorage.clear()
  router.push('/')
}

const avatarError = () => {
  showAvatar.value = false
}
</script>
