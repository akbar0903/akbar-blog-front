<script setup>
import { useAdminStore } from '@/stores/index.js'
import { ElMessage } from 'element-plus'
import { fileUploadService } from '@/api/upload.js'
import { adminGetInfoService, adminUpdateInfoService } from '@/api/admin.js'
import { ref } from 'vue'

const adminModule = ref({
  username: '',
  avatar: '',
  nickname: '',
  githubUrl: '',
  giteeUrl: '',
  biliUrl: '',
})

// 从pinia中获取管理员信息
const adminStore = useAdminStore()
adminModule.value.username = adminStore.admin.username
adminModule.value.avatar = adminStore.admin.avatar
adminModule.value.nickname = adminStore.admin.nickname
adminModule.value.githubUrl = adminStore.admin.githubUrl
adminModule.value.giteeUrl = adminStore.admin.giteeUrl
adminModule.value.biliUrl = adminStore.admin.biliUrl

//修改头像
const avatarUrl = ref(adminModule.value.avatar)
const tempAvatar = ref(null) // 用于临时保存头像

//预览图片
const onSelectFile = (uploadFile) => {
  avatarUrl.value = URL.createObjectURL(uploadFile.raw)
  tempAvatar.value = uploadFile.raw
}

//上传头像
const uploadAvatar = async () => {
  if (!tempAvatar.value) {
    // 如果没有选择新的头像
    ElMessage.warning('请选择一个新的头像！')
    return
  }

  try {
    const result = await fileUploadService(tempAvatar.value)
    adminModule.value.avatar = result.data
    ElMessage.success('头像上传成功！')
  } catch (error) {
    ElMessage.error(error.message)
  }
}

//提交修改
const updateAdminInfo = async () => {
  if (
    adminModule.value.nickname === adminStore.admin.nickname &&
    adminModule.value.githubUrl === adminStore.admin.githubUrl &&
    adminModule.value.biliUrl === adminStore.admin.biliUrl &&
    adminModule.value.giteeUrl === adminStore.admin.giteeUrl &&
    adminModule.value.avatar === adminStore.admin.avatar
  ) {
    ElMessage.warning('没有修改信息, 请修改后再上传！')
    return
  }

  try {
    await adminUpdateInfoService(adminModule.value)
    ElMessage.success('管理员信息修改成功！')
    const result = await adminGetInfoService()
    adminStore.setAdmin(result.data)
  } catch (error) {
    ElMessage.error(error.message)
  }
}
</script>

<template>
  <div class="card-container bg-white dark:bg-zinc-900 rounded-xl overflow-hidden">
    <div class="block md:flex gap-2 bg-white dark:bg-zinc-900">
      <el-card shadow="never" class="card-box flex-1 !border-none !rounded-xl">
        <template #header>
          <span class="text-base text-zinc-500 dark:text-white font-bold">修改个人信息</span>
        </template>
        <el-form label-width="100" class="max-w-sm md:max-w-md lg:max-w-lg w-full">
          <el-form-item label="用户名">
            <el-input v-model="adminModule.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="adminModule.nickname"></el-input>
          </el-form-item>
          <el-form-item label="Github地址">
            <el-input v-model="adminModule.githubUrl"></el-input>
          </el-form-item>
          <el-form-item label="Gitee地址">
            <el-input v-model="adminModule.giteeUrl"></el-input>
          </el-form-item>
          <el-form-item label="BiliBili地址">
            <el-input v-model="adminModule.biliUrl"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card shadow="never" class="card-box flex-1 !border-none !rounded-xl">
        <template #header>
          <span class="text-base text-zinc-500 dark:text-white font-bold">上传头像</span>
        </template>
        <el-upload action="" :show-file-list="false" :on-change="onSelectFile" :auto-upload="false">
          <img
            v-if="avatarUrl"
            :src="avatarUrl"
            class="block w-44 h-44 object-cover dark:text-white"
            alt="头像"
          />
          <icon-mdi-cloud-upload v-else class="text-xl text-center text-zinc-500 dark:text-white" />
        </el-upload>
        <div class="text-center mt-4">
          <el-button @click="uploadAvatar" type="success">上传</el-button>
        </div>
      </el-card>
    </div>
    <div class="my-4 text-center">
      <el-button type="primary" @click="updateAdminInfo" class="w-28">保存</el-button>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  box-shadow: var(--my-base-box-shadow) !important;
}

:deep(.el-form-item__content) {
  display: flex;
  justify-self: center;
  justify-content: center;
}

:deep(.el-upload) {
  @apply relative left-1/2 top-0 transform -translate-x-1/2 w-44 h-44;
  @apply border-[1px] border-dashed border-gray-200 rounded-md overflow-hidden;
  @apply transition-colors duration-300 ease-in-out;
  @apply hover:border-[var(--el-color-primary)];
}
</style>
