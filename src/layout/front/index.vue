<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ProfileCard from '@/components/front/ProfileCard.vue'
import LatestPosts from '@/components/front/LatestPosts.vue'

const route = useRoute()

// 判断是否显示侧边栏
const showSidebar = computed(() => {
  return route.name === 'frontArticleList'
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Navbar />
    <main class="flex-grow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- 主要内容区域 -->
          <div :class="[showSidebar ? 'lg:col-span-9' : 'lg:col-span-12']">
            <router-view />
          </div>

          <!-- 右侧侧边栏 -->
          <aside v-if="showSidebar" class="hidden lg:block lg:col-span-3 space-y-6">
            <ProfileCard />
            <LatestPosts />
          </aside>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
