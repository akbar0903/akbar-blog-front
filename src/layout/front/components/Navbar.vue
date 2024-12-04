<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from '@/layout/front/components/Sidebar.vue'

const isSidebarOpen = ref(false)
const isVisible = ref(true)
const lastScrollPosition = ref(0)
const scrollThreshold = 50
const isScrollingUp = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const handleScroll = () => {
  const currentScrollPosition = window.scrollY
  isScrollingUp.value = currentScrollPosition < lastScrollPosition.value

  if (Math.abs(currentScrollPosition - lastScrollPosition.value) > scrollThreshold) {
    isVisible.value = isScrollingUp.value || currentScrollPosition < 100
    lastScrollPosition.value = currentScrollPosition
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const menuItems = [
  { name: '首页', routerName: 'frontArticleList' },
  { name: '标签', routerName: 'frontTagList' },
  { name: '分类', routerName: 'frontCategoryList' },
  { name: '归档', routerName: 'archive' },
  { name: '关于', routerName: 'about' },
]
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 bg-white shadow-md z-20 transition-transform duration-300"
    :class="[isVisible ? 'translate-y-0' : '-translate-y-full', isScrollingUp ? 'shadow-md' : '']"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <router-link to="/" class="text-xl font-bold text-gray-800">艾克的博客</router-link>
        </div>

        <!-- 桌面端菜单 -->
        <div class="hidden md:flex space-x-8">
          <router-link
            v-for="item in menuItems"
            :key="item.routerName"
            :to="{ name: item.routerName }"
            class="text-gray-600 hover:text-blue-500 transition-colors"
          >
            {{ item.name }}
          </router-link>
        </div>

        <!-- 移动端菜单按钮 -->
        <button class="md:hidden text-gray-600 hover:text-gray-900" @click="toggleSidebar">
          <icon-mdi-menu class="text-2xl" />
        </button>
      </div>
    </div>
  </nav>

  <!-- 为了防止内容被固定导航栏遮挡，添加一个占位符 -->
  <div class="h-16"></div>

  <!-- 侧边栏组件 -->
  <Sidebar :is-open="isSidebarOpen" :menu-items="menuItems" :on-close="closeSidebar" />
</template>

<style scoped>
/* 添加平滑过渡效果 */
.transition-transform {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
