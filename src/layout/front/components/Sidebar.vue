<script setup>
import { defineProps, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminStore } from '@/stores/index.js'
import avatarImg from '@/assets/images/Mofei1-cut.jpg'

const route = useRoute()

defineProps({
  isOpen: Boolean,
  menuItems: Array,
  onClose: Function,
})

const adminStore = useAdminStore()

const profileData = ref({
  nickname: adminStore.admin.nickname,
  avatar: adminStore.admin.avatar,
  articleCount: 5,
  tagCount: 8,
  categoryCount: 4,
})
</script>

<template>
  <!-- 遮罩层 -->
  <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 z-40" @click="onClose"></div>

  <!-- 侧边栏 -->
  <div
    :class="[
      'fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <!-- 关闭按钮 -->
    <button
      class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors duration-200"
      @click="onClose"
    >
      <icon-mdi-close class="text-2xl" />
    </button>

    <!-- 头部信息 -->
    <div class="flex flex-col items-center p-4">
      <img
        :src="avatarImg"
        alt="avatar"
        class="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm hover:border-blue-200 transition-colors duration-200"
      />
      <h2 class="mt-4 text-xl font-bold text-gray-800">{{ profileData.nickname }}</h2>
    </div>
    <!-- 统计信息 -->
    <div class="px-4 grid grid-cols-3 gap-4 text-center">
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

    <div class="p-4">
      <!-- 导航菜单 -->
      <nav class="space-y-1">
        <router-link
          v-for="item in menuItems"
          :key="item.routerName"
          :to="{ name: item.routerName }"
          class="block px-4 py-2.5 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-blue-600 font-semibold transition-colors"
          :class="{ 'bg-blue-50 text-blue-600': route.name === item.routerName }"
          @click="onClose"
        >
          {{ item.name }}
        </router-link>
      </nav>
    </div>
  </div>
</template>
