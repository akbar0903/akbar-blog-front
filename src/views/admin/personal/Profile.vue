<script setup>
import { ref } from 'vue'
import { useAdminStore } from '@/stores/index.js'

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
</script>

<template>
  <div class="card-container h-full grid grid-cols-12 gap-2 bg-white dark:bg-zinc-900 rounded-xl">
    <el-card shadow="never" class="card-box col-span-12 md:col-span-6 !border-none !rounded-xl">
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
        <el-form-item class="text-center">
          <el-button type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never" class="card-box col-span-12 md:col-span-6 !border-none !rounded-xl">
      <template #header>
        <span class="text-base text-zinc-500 dark:text-white font-bold">上传头像</span>
      </template>
    </el-card>
  </div>
</template>

<style scoped>
.card-container {
  box-shadow: var(--my-base-box-shadow) !important;
}

:deep(.el-form-item__content) {
  justify-content: center;
}
</style>
