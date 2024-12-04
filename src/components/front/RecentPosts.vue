<script setup>
const recentPosts = [
  {
    id: 1,
    title: '2024年前端开发趋势展望',
    date: '2024-03-15',
    views: 1234
  },
  {
    id: 2,
    title: 'Vue3 + TypeScript 实战指南',
    date: '2024-03-10',
    views: 2156
  },
  {
    id: 3,
    title: '深入浅出Tailwind CSS',
    date: '2024-03-05',
    views: 1789
  },
  {
    id: 4,
    title: '构建高性能React应用：最佳实践',
    date: '2024-03-01',
    views: 3267
  }
]
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 mt-6">
    <h3 class="text-lg font-bold text-gray-800 mb-4">最新文章</h3>
    <div class="space-y-4">
      <div
        v-for="post in recentPosts"
        :key="post.id"
        class="group cursor-pointer"
      >
        <h4 class="text-gray-700 group-hover:text-blue-600 text-sm font-medium line-clamp-2">
          {{ post.title }}
        </h4>
        <div class="flex items-center text-xs text-gray-500 mt-1 space-x-2">
          <span>{{ post.date }}</span>
          <span>·</span>
          <div class="flex items-center">
            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {{ post.views }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
