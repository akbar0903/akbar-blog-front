<script setup>
import { ref, onMounted } from 'vue'

// 添加一些测试数据
const latestPosts = ref([
  {
    id: 1,
    title: '2024年前端开发趋势展望'
  },
  {
    id: 2,
    title: 'Vue3 + TypeScript 实战指南'
  },
  {
    id: 3,
    title: '深入浅出Tailwind CSS'
  }
])

onMounted(async () => {
  // 后续可以添加实际的API调用
  // latestPosts.value = await fetchLatestPosts()
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-lg font-bold mb-4">最新文章</h3>
    <ul class="space-y-3">
      <li v-for="post in latestPosts" :key="post.id">
        <router-link
          :to="{ name: 'frontArticleDetail', params: { id: post.id }}"
          class="text-gray-700 hover:text-blue-600 transition-colors"
        >
          {{ post.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
