<script setup>
import emitter from '@/utils/emitter'
import { useRoute } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

const route = useRoute()

// 控制侧边栏折叠和展开状态
const isSidebarOpen = ref(true)
const openSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
onMounted(() => {
  emitter.on('openSidebar', openSidebar)
})
onUnmounted(() => {
  emitter.off('openSidebar', openSidebar)
})
</script>

<template>
  <el-aside
    :width="isSidebarOpen ? 170 + 'px' : 50 + 'px'"
    class="fixed top-[60px] left-0 h-full bg-white transition-all duration-200 ease-in-out !overflow-x-hidden dark:bg-zinc-900"
  >
    <el-menu
      :class="{ '!w-[35px]': !isSidebarOpen }"
      class="!border-none !mt-4 !ml-2"
      :router="true"
      :default-active="route.name"
      :collapse="!isSidebarOpen"
      :collapse-transition="true"
    >
      <el-menu-item index="adminDashboard" :route="{ name: 'adminDashboard' }">
        <el-icon>
          <icon-mdi-home class="menu-icon" />
        </el-icon>
        <template #title>
          <span class="menu-title">首页</span>
        </template>
      </el-menu-item>

      <el-menu-item index="articleList" :route="{ name: 'articleList' }">
        <el-icon>
          <icon-mdi-file-document-multiple class="menu-icon" />
        </el-icon>
        <template #title>
          <span class="menu-title">文章管理</span>
        </template>
      </el-menu-item>

      <el-menu-item index="category" :route="{ name: 'categoryList' }">
        <el-icon>
          <icon-mdi-folder-multiple class="menu-icon" />
        </el-icon>
        <template #title>
          <span class="menu-title">分类管理</span>
        </template>
      </el-menu-item>

      <el-menu-item index="tagList" :route="{ name: 'tagList' }">
        <el-icon>
          <icon-mdi-tag-multiple class="menu-icon" />
        </el-icon>
        <template #title>
          <span class="menu-title">标签管理</span>
        </template>
      </el-menu-item>

      <el-sub-menu index="album-submenu">
        <template #title>
          <el-icon>
            <icon-mdi-image class="menu-icon" />
          </el-icon>
          <span class="menu-title">相册管理</span>
        </template>
        <el-menu-item index="avatarHistory" :route="{ name: 'avatarHistory' }">
          <el-icon>
            <icon-mdi-account-box-multiple class="menu-icon" />
          </el-icon>
          <template #title>
            <span class="menu-title">头像列表</span>
          </template>
        </el-menu-item>
        <el-menu-item index="articleCoverList" :route="{ name: 'articleCoverList' }">
          <el-icon>
            <icon-mdi-image-edit class="menu-icon" />
          </el-icon>
          <template #title>
            <span class="menu-title">文章封面列表</span>
          </template>
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="personal-submenu">
        <template #title>
          <el-icon>
            <icon-mdi-account-circle class="menu-icon" />
          </el-icon>
          <span class="menu-title">个人中心</span>
        </template>
        <el-menu-item index="profile" :route="{ name: 'profile' }">
          <el-icon>
            <icon-mdi-information class="menu-icon" />
          </el-icon>
          <template #title>
            <span class="menu-title">个人信息</span>
          </template>
        </el-menu-item>
        <el-menu-item index="updatePWD" :route="{ name: 'updatePWD' }">
          <el-icon>
            <icon-mdi-account-lock-open class="menu-icon" />
          </el-icon>
          <template #title>
            <span class="menu-title">修改密码</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style scoped>
.menu-title {
  @apply font-semibold;
}
.menu-icon {
  @apply w-6 h-6;
}

:deep(.el-sub-menu__title) {
  @apply rounded-lg !important;
}

.el-menu-item {
  @apply rounded-lg;
}
</style>
