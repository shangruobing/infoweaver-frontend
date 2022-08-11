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

  <el-dialog v-model="dialogVisible" title="快上传一个头像啦">
    <el-upload
      class="avatar-uploader"
      action="https://www.infoweaver.cloud/api/avatar/"
      :show-file-list="true"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      name="avatar"
      :headers="headers"
      @closed="dialogVisible = false"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import service from '@/utils/request'
// 划分
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import Notification from '@/utils/notification'

const dialogVisible = ref(false)

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

    const avatar = localStorage.getItem('avatar')
    if (avatar) {
      avatarURL.value = avatar
    } else {
      try {
        const response = await service.get('avatar')
        console.log(response)

        const domain = response.config.baseURL?.split('/api/')[0]
        // https://www.infoweaver.cloud + /media/avatar/XXX.jpeg
        const avatar = response.data
        if (avatar) {
          avatarURL.value = domain + avatar
          console.log(avatarURL.value)
          localStorage.setItem('avatar', avatarURL.value)
          showAvatar.value = true
        } else {
          showAvatar.value = false
        }
      } catch (error) {
        console.log(error)
      }
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
// 划分
const imageUrl = ref('')
const headers = { Authorization: localStorage.getItem('authorization') }

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  console.log(imageUrl.value)
  localStorage.removeItem('avatar')
  console.log(response)
  console.log('https://www.infoweaver.cloud' + response.image)
  localStorage.setItem('avatar', 'https://www.infoweaver.cloud' + response.image)
  console.log('success')
  Notification({ text: '上传成功', type: 'success' })
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log(headers)

  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
