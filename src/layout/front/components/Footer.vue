<script setup>
import { useAdminStore } from '@/stores/index.js'

const adminStore = useAdminStore()
</script>

<template>
  <footer class="bg-gray-800 text-white">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <p>&copy; 2024 艾克的博客. 保留所有权利</p>
        </div>
        <div class="flex space-x-4">
          <a :href="adminStore.admin.githubUrl" target="_blank" class="hover:text-gray-300"
            >GitHub
          </a>
          <a :href="adminStore.admin.giteeUrl" target="_blank" class="hover:text-gray-300">Gite</a>
          <a :href="adminStore.admin.biliUrl" target="_blank" class="hover:text-gray-300"
            >BiliBili</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
