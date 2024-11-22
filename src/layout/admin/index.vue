<script setup>
import Navbar from '@/layout/admin/components/Navbar.vue'
import Sidebar from '@/layout/admin/components/Sidebar.vue'
import Main from '@/layout/admin/components/Main.vue'
</script>

<template>
  <el-container class="h-full">
    <Navbar />
    <el-container>
      <Sidebar />
      <Main />
    </el-container>
  </el-container>
</template>
