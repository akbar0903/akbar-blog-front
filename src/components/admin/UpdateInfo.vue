<script setup>
import { useAdminStore } from '@/stores/index.js'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { adminGetInfoService, adminUpdateInfoService } from '@/api/admin.js'

const adminModule = ref({
  username: '',
  nickname: '',
  githubUrl: '',
  giteeUrl: '',
  biliUrl: '',
})

// 从pinia中获取管理员信息
const adminStore = useAdminStore()
adminModule.value.username = adminStore.admin.username
adminModule.value.nickname = adminStore.admin.nickname
adminModule.value.githubUrl = adminStore.admin.githubUrl
adminModule.value.giteeUrl = adminStore.admin.giteeUrl
adminModule.value.biliUrl = adminStore.admin.biliUrl

// 提交修改后的个人信息
const updateAdminInfo = async () => {
  if (
    adminModule.value.nickname === adminStore.admin.nickname &&
    adminModule.value.githubUrl === adminStore.admin.githubUrl &&
    adminModule.value.biliUrl === adminStore.admin.biliUrl &&
    adminModule.value.giteeUrl === adminStore.admin.giteeUrl
  ) {
    ElMessage.warning('没有修改信息, 请修改后再保存！')
    return
  }

  try {
    await adminUpdateInfoService(adminModule.value)
    const result = await adminGetInfoService()
    adminStore.setAdmin(result.data)
    ElMessage.success('管理员信息修改成功！')
  } catch (error) {
    ElMessage.error(error.message)
  }
}
</script>

<template>
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
    <div class="mt-8 mb-4 text-center">
      <el-button type="success" @click="updateAdminInfo">保存信息</el-button>
    </div>
  </el-card>
</template>

<style scoped></style>
