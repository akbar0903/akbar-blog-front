<script setup>
defineProps({
  isOpen: Boolean,
})
defineEmits(['close'])
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
    @click="$emit('close')"
  >
    <div class="fixed inset-y-0 left-0 w-64 bg-white shadow-xl" @click.stop>
      <div class="p-4">
        <h1 class="text-xl font-bold mb-4">菜单</h1>
        <div class="space-y-4">
          <a href="#" class="block hover:text-gray-600">首页</a>
          <a href="#" class="block hover:text-gray-600">文章</a>
          <a href="#" class="block hover:text-gray-600">关于</a>
        </div>
      </div>
    </div>
  </div>
</template>
