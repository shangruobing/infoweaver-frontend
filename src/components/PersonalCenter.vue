<template>
  <el-dropdown>
    <el-avatar>
      <img v-if="store.showAvatar" :src="store.avatarURL" @error="avatarError()" />
      <img v-else src="@/assets/home/头像.svg" />
    </el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <template v-if="store.isAuthenticated">
          <el-dropdown-item v-if="isHome" @click="router.push('/content/')">
            <el-icon><House /></el-icon> 进入系统
          </el-dropdown-item>

          <el-dropdown-item v-else @click="dialogVisible = true">
            <el-icon><User /></el-icon>个人中心
          </el-dropdown-item>

          <el-dropdown-item @click="router.push('/content/help')">
            <el-icon><Service /></el-icon>帮助
          </el-dropdown-item>

          <el-dropdown-item divided @click="logout">
            <el-icon><SwitchButton /></el-icon>退出登录
          </el-dropdown-item>
        </template>

        <template v-else>
          <el-dropdown-item @click="router.push('/login')">
            <el-icon><User /></el-icon>登录
          </el-dropdown-item>

          <el-dropdown-item @click="router.push('/register')">
            <el-icon><EditPen /></el-icon>注册
          </el-dropdown-item>

          <el-dropdown-item divided @click="router.push('/help')">
            <el-icon><Service /></el-icon>帮助
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <el-dialog
    v-model="dialogVisible"
    title="个人中心"
    custom-class="circle-border"
    width="450px"
    center
  >
    <el-descriptions direction="vertical" :column="4" border style="display: flex">
      <el-descriptions-item label="Avatar" align="center">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="Click to Upload Avatar"
          placement="top-end"
          :disabled="hiddenBadge"
        >
          <el-badge value="new" :hidden="hiddenBadge">
            <el-avatar @click="clickAvatar">
              <img v-if="store.showAvatar" :src="store.avatarURL" @error="avatarError()" />
              <img v-else src="@/assets/home/头像.svg" />
            </el-avatar>
          </el-badge>
        </el-tooltip>
      </el-descriptions-item>
      <el-descriptions-item label="Username" align="center">{{
        store.username
      }}</el-descriptions-item>
      <el-descriptions-item label="Telephone" align="center">13500000000</el-descriptions-item>
      <el-descriptions-item label="Place" :span="2" align="center">云南</el-descriptions-item>
      <el-descriptions-item label="Remarks" align="center">
        <el-tag size="small"> {{ store.type === 0 ? 'Admin' : 'User' }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address" align="center">
        云南省昆明市呈贡区昆明理工大学
      </el-descriptions-item>
    </el-descriptions>

    <el-dialog
      v-model="innerVisible"
      width="260px"
      title="上传头像"
      custom-class="circle-border"
      append-to-body
      center
      draggable
    >
      <el-upload
        class="avatar-uploader"
        action="https://www.infoweaver.cloud/api/avatar/"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        name="avatar"
        :headers="headers"
        @closed="dialogVisible = false"
        :show-file-list="false"
      >
        <img v-if="store.showAvatar" :src="store.avatarURL" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </el-dialog>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { Plus, House, Service, SwitchButton, User, EditPen } from '@element-plus/icons-vue'

import service from '@/utils/request'
import Notification from '@/utils/notification'
import { useAuthStore } from '@/stores/authentication'

defineProps({
  isHome: Boolean
})

const router = useRouter()
const store = useAuthStore()

onMounted(() => {
  const username = localStorage.getItem('username')
  if (username) {
    store.username = username
    const avatar = localStorage.getItem('avatar')
    if (avatar) {
      store.avatarURL = avatar
    } else {
      requestAvatar()
    }
  }
})

const requestAvatar = async () => {
  try {
    const response = await service.get('avatar')
    // https://www.infoweaver.cloud + /media/avatar/XXX.jpeg
    const domain = response.config.baseURL?.split('/api/')[0]
    const avatar = response.data
    console.log(response.data)

    if (avatar) {
      const avatarURL = domain + avatar
      localStorage.setItem('avatar', avatarURL)
      store.avatarURL = avatarURL
    }
  } catch (error) {
    console.log(error)
  }
}

const avatarError = () => {
  console.log('Avatar Error')
}

const logout = () => {
  store.logout()
  router.push('/')
}

const dialogVisible = ref(false)

// Avatar validator and callback()
const headers = { Authorization: localStorage.getItem('authorization') }

const hiddenBadge = ref(false)
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  localStorage.removeItem('avatar')
  localStorage.setItem('avatar', 'https://www.infoweaver.cloud' + response.image)
  store.avatarURL = 'https://www.infoweaver.cloud' + response.image
  Notification({ text: '上传成功', type: 'success' })
  innerVisible.value = false
  hiddenBadge.value = true
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG/PNG format!')
    return false
  }
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const innerVisible = ref(false)
const clickAvatar = () => {
  innerVisible.value = true
}
</script>

<style lang="scss">
// Setting scoped will cause the  dialog css to be invalid.
.dialog-footer button:first-child {
  margin-right: 10px;
}

.circle-border {
  border-radius: 20px;
}

.avatar-uploader {
  align-self: center;
}

.avatar-uploader .avatar {
  display: block;
  width: 180px;
  height: 180px;
  border-radius: 20px;
}

.avatar-uploader .el-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 20px;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  width: 180px;
  height: 180px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}

.el-dialog__body {
  display: flex;
  padding-top: 1em;
  flex-direction: column;
}

// The universal selector (*) is known to be slow
.el-menu-item {
  td {
    vertical-align: middle;
  }
}

.el-descriptions {
  justify-content: center;
}
</style>
