<script setup>
import { defineProps } from 'vue'

defineProps({
  scrollElement: {
    type: Object,
    required: true
  },
  editorId: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <h3 class="text-lg font-bold mb-4">文章目录</h3>
    <div class="max-h-[calc(100vh-20rem)] overflow-y-auto">
      <MdCatalog :scrollElement="scrollElement" :editorId="editorId" />
    </div>
  </div>
</template>

<style scoped>
:deep(.md-catalog-link) {
  @apply text-gray-600 hover:text-blue-600 transition-colors;
}

:deep(.md-catalog-link.active) {
  @apply text-blue-600 font-medium;
}

/* 自定义滚动条样式 */
.max-h-\[calc\(100vh-20rem\)\]::-webkit-scrollbar {
  width: 4px;
}

.max-h-\[calc\(100vh-20rem\)\]::-webkit-scrollbar-track {
  @apply bg-gray-100 rounded;
}

.max-h-\[calc\(100vh-20rem\)\]::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded hover:bg-gray-400;
}
</style>
