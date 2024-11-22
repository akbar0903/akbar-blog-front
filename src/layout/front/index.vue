<script setup></script>

<template>
  <div class="h-20 bg-violet-600 text-white flex items-center justify-center">
    <h1 class="text-3xl">前台布局</h1>
  </div>
  <router-link :to="{ name: 'adminLogin' }">
    <el-button>进入后台</el-button>
  </router-link>
</template>

<style scoped></style>
