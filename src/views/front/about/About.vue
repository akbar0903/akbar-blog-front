<script setup>
import SkillsCarousel from '@/components/front/SkillsCarousel.vue'
</script>

<template>
  <div class="space-y-6">
    <!-- 个人介绍卡片 -->
    <div class="bg-white rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold mb-6">关于我</h1>
      <div class="prose max-w-none">
        <p class="text-gray-700 leading-relaxed">这里是关于页面的内容...</p>
      </div>
    </div>

    <!-- 技能轮播 -->
    <SkillsCarousel />

    <!-- 其他内容... -->
  </div>
</template>
