<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:currentPage', 'change'])

const handlePageChange = (page) => {
  emit('update:currentPage', page)
  emit('change', page)
}
</script>

<template>
  <div class="flex justify-center space-x-2">
    <!-- 首页 -->
    <button
      class="px-3 py-1 rounded border text-sm"
      :class="[
        currentPage === 1
          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
          : 'border-blue-500 text-blue-500 hover:bg-blue-50'
      ]"
      :disabled="currentPage === 1"
      @click="handlePageChange(1)"
    >
      首页
    </button>

    <!-- 上一页 -->
    <button
      class="px-3 py-1 rounded border text-sm"
      :class="[
        currentPage === 1
          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
          : 'border-blue-500 text-blue-500 hover:bg-blue-50'
      ]"
      :disabled="currentPage === 1"
      @click="handlePageChange(currentPage - 1)"
    >
      上一页
    </button>

    <!-- 页码 -->
    <button
      v-for="page in totalPages"
      :key="page"
      class="px-3 py-1 rounded border text-sm"
      :class="[
        page === currentPage
          ? 'bg-blue-500 text-white border-blue-500'
          : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500'
      ]"
      @click="handlePageChange(page)"
    >
      {{ page }}
    </button>

    <!-- 下一页 -->
    <button
      class="px-3 py-1 rounded border text-sm"
      :class="[
        currentPage === totalPages
          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
          : 'border-blue-500 text-blue-500 hover:bg-blue-50'
      ]"
      :disabled="currentPage === totalPages"
      @click="handlePageChange(currentPage + 1)"
    >
      下一页
    </button>

    <!-- 末页 -->
    <button
      class="px-3 py-1 rounded border text-sm"
      :class="[
        currentPage === totalPages
          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
          : 'border-blue-500 text-blue-500 hover:bg-blue-50'
      ]"
      :disabled="currentPage === totalPages"
      @click="handlePageChange(totalPages)"
    >
      末页
    </button>
  </div>
</template>
