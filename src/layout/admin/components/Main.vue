<script setup>
import { ref, onMounted, onUnmounted} from 'vue'
import emitter from '@/utils/emitter.js'

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
  <el-main class="!p-0">
    <div
      :class="isSidebarOpen ? 'ml-[170px]' : 'ml-[50px]'"
      class="pt-[60px] h-full bg-white dark:bg-zinc-900 transition-all duration-200 ease-in-out overflow-hidden"
    >
      <div
        class="content-box p-5 bg-slate-100 h-full border-tl rounded-tl-[30px] dark:bg-zinc-950 dark:text-white dark:border-t-[1px] dark:border-solid dark:border-zinc-700 overflow-auto"
      >
        <router-view />
      </div>
    </div>
  </el-main>
</template>

<style scoped>
.content-box {
  box-shadow: var(--my-inset-box-shadow);
}
</style>
