<script setup>
import { ref } from 'vue'
import avatarImg from '@/assets/images/Mofei1-cut.jpg'

const profileData = ref({
  nickname: '学会微笑',
  articleCount: 5,
  tagCount: 8,
  categoryCount: 4,
  bio: '热爱编程，热爱技术，喜欢分享。专注于Web前端开发，同时对后端技术也有涉猎。',
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <!-- 头像区域 -->
    <div class="flex flex-col items-center">
      <img
        :src="avatarImg"
        alt="avatar"
        class="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm hover:border-blue-200 transition-colors"
      />
      <h2 class="mt-4 text-xl font-bold text-gray-800">{{ profileData.nickname }}</h2>
      <p class="mt-2 text-sm text-gray-600 text-center">{{ profileData.bio }}</p>
    </div>

    <!-- 统计信息 -->
    <div class="mt-6 grid grid-cols-3 gap-4 text-center">
      <div class="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
        <div class="text-lg font-semibold text-gray-800">{{ profileData.articleCount }}</div>
        <div class="text-sm text-gray-500">文章</div>
      </div>
      <div class="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
        <div class="text-lg font-semibold text-gray-800">{{ profileData.tagCount }}</div>
        <div class="text-sm text-gray-500">标签</div>
      </div>
      <div class="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
        <div class="text-lg font-semibold text-gray-800">{{ profileData.categoryCount }}</div>
        <div class="text-sm text-gray-500">分类</div>
      </div>
    </div>
  </div>
</template>
