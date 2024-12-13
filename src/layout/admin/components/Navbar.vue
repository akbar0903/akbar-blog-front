<script setup>
import NavbarIcon from '@/components/admin/NavbarIcon.vue'
import emitter from '@/utils/emitter'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAdminStore } from '@/stores'

const router = useRouter()
const adminStore = useAdminStore()

// 侧边栏折叠
const isSidebarOpen = ref(false)
const openSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  emitter.emit('openSidebar')
}

// 切换主题
const isDarkMode = ref(adminStore.getTheme() === 'dark')
const toggleTheme = () => {
  try {
    isDarkMode.value = !isDarkMode.value
    adminStore.setTheme(isDarkMode.value ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  } catch (error) {
    ElMessage.error(error.message)
  }
}

// 初始化主题
onMounted(() => {
  const currentTheme = adminStore.getTheme()
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark')
  }
})

// 网页全屏
const openFullscreen = () => {
  const element = document.documentElement
  if (!document.fullscreenElement) {
    element.requestFullscreen().catch((err) => {
      ElMessage.error(err.message)
    })
  } else if (document.exitFullscreen) {
    document.exitFullscreen().catch((err) => {
      ElMessage.error(err.message)
    })
  }
}

// 退出登录
const logout = async () => {
  await ElMessageBox.confirm('确认退出登录吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      adminStore.removeToken()
      document.documentElement.classList.remove('dark')
      router.push({ name: 'adminLogin' })
      ElMessage.success('欢迎下次光临！')
    })
    .catch(() => {
      ElMessage.info('操作已取消！')
    })
}
</script>

<template>
  <header class="fixed top-0 left-0 px-5 w-full h-[60px] bg-white dark:bg-zinc-900 z-50">
    <div class="w-full h-full flex items-center justify-between dark:bg-zinc-900">
      <!-- 左侧容器-->
      <div class="flex items-center justify-center space-x-2">
        <router-link :to="{ name: 'adminDashboard' }" class="flex items-center space-x-1">
          <img
            src="https://blog-ultimate.oss-cn-beijing.aliyuncs.com/logo.png"
            alt="logo-image"
            class="w-10"
          />
          <h1 class="text-xl font-bold text-slate-700 dark:text-white">Blog Admin</h1>
        </router-link>
        <button
          @click="openSidebar"
          class="group hover:bg-blue-50 dark:hover:bg-zinc-800 rounded-full p-3 transition-colors duration-200"
        >
          <NavbarIcon
            propClass="fill-slate-500 dark:fill-white dark:group-hover:fill-blue-500 transition-colors duration-200"
            with="18"
          />
        </button>
      </div>

      <!-- 右侧容器-->
      <div class="flex items-center space-x-1">
        <button
          @click="toggleTheme"
          class="group hover:bg-blue-50 dark:hover:bg-zinc-800 rounded-full p-2 transition-colors duration-200"
        >
          <icon-mdi-weather-night
            v-if="isDarkMode"
            class="text-base text-slate-500 dark:text-white dark:group-hover:text-blue-500"
          />
          <icon-mdi-white-balance-sunny
            v-else
            class="text-base text-slate-500 dark:text-white transition-colors duration-200"
          />
        </button>
        <button
          @click="openFullscreen"
          class="group hover:bg-blue-50 dark:hover:bg-zinc-800 rounded-full p-[6px] transition-colors duration-200"
        >
          <icon-mdi-fullscreen
            class="text-lg text-slate-500 dark:text-white dark:group-hover:text-blue-500 transition-colors duration-200"
          />
        </button>

        <button
          @click="logout"
          class="group hover:bg-blue-50 dark:hover:bg-zinc-800 rounded-full p-[6px] transition-colors duration-200"
        >
          <icon-mdi-logout
            class="text-lg text-slate-500 dark:text-white dark:group-hover:text-blue-500 transition-colors duration-200"
          />
        </button>

        <el-avatar :src="adminStore.admin.avatar" class="w-10 !select-none" shape="square" />
      </div>
    </div>
  </header>
</template>

<style scoped>
:deep(.el-dropdown-menu__item) {
  @apply dark:text-white dark:hover:text-blue-500 dark:hover:bg-zinc-800;
}
</style>
