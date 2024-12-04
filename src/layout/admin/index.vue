<script setup>
import Navbar from '@/layout/admin/components/Navbar.vue'
import Sidebar from '@/layout/admin/components/Sidebar.vue'
import Main from '@/layout/admin/components/Main.vue'
import { useAdminStore } from '@/stores/index.js'

// 获取管理员信息，存储到pinia中
const adminStore = useAdminStore()
adminStore.getAdmin()
</script>

<template>
  <el-container class="h-screen">
    <Navbar />
    <el-container class="h-full">
      <Sidebar />
      <Main />
    </el-container>
  </el-container>
</template>
