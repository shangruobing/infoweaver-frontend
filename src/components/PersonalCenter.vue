<template>
  <el-dropdown>
    <el-avatar>
      <img v-if="showAvatar" :src="avatarURL" @error="avatarError()" />
      <img v-else src="@/assets/home/头像.svg" />
    </el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <template v-if="store.getters.isLogin">
          <el-dropdown-item v-if="isHome" @click="router.push('/content/')">
            进入系统
          </el-dropdown-item>
          <el-dropdown-item v-else @click="dialogVisible = true"> 个人中心 </el-dropdown-item>
          <el-dropdown-item @click="router.push('/content/help')">帮助</el-dropdown-item>
          <el-dropdown-item divided @click="logout"> 退出登录 </el-dropdown-item>
        </template>

        <template v-else>
          <el-dropdown-item @click="router.push('/login/')">登录</el-dropdown-item>
          <el-dropdown-item @click="router.push('/register/')">注册</el-dropdown-item>
          <el-dropdown-item divided @click="router.push('/help/')">帮助</el-dropdown-item>
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
              <img v-if="showAvatar" :src="avatarURL" @error="avatarError()" />
              <img v-else src="@/assets/home/头像.svg" />
            </el-avatar>
          </el-badge>
        </el-tooltip>
      </el-descriptions-item>
      <el-descriptions-item label="Username" align="center">{{ username }}</el-descriptions-item>
      <el-descriptions-item label="Telephone" align="center">13500000000</el-descriptions-item>
      <el-descriptions-item label="Place" :span="2" align="center">云南</el-descriptions-item>
      <el-descriptions-item label="Remarks" align="center">
        <el-tag size="small">User</el-tag>
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
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </el-dialog>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

import service from '@/utils/request'
import Notification from '@/utils/notification'

defineProps({
  isHome: Boolean
})

const router = useRouter()
const store = useStore()

const showAvatar = ref(store.getters.isLogin)
const username = ref(localStorage.getItem('username'))
const avatarURL = ref('')

onMounted(() => {
  const username = localStorage.getItem('username')
  if (username) {
    store.commit('loginSuccess', username)

    const avatar = localStorage.getItem('avatar')
    if (avatar) {
      avatarURL.value = avatar
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
    if (avatar) {
      avatarURL.value = domain + avatar
      localStorage.setItem('avatar', avatarURL.value)
      showAvatar.value = true
    } else {
      showAvatar.value = false
    }
  } catch (error) {
    console.log(error)
  }
}

const avatarError = () => {
  showAvatar.value = false
}

const logout = () => {
  store.commit('logout')
  localStorage.clear()
  router.push('/')
}

const dialogVisible = ref(false)

// Avatar validator and callback()
const imageUrl = ref('')
const headers = { Authorization: localStorage.getItem('authorization') }

const hiddenBadge = ref(false)
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  // imageUrl blob avatarURL string
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  avatarURL.value = 'https://www.infoweaver.cloud' + response.image
  localStorage.removeItem('avatar')
  localStorage.setItem('avatar', 'https://www.infoweaver.cloud' + response.image)
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
  border: 1px dashed var(--el-border-color);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  border-radius: 20px;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 180px;
  height: 180px;
  text-align: center;
}

.el-dialog__body {
  padding-top: 1em;
  display: flex;
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
