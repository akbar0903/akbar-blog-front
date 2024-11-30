<!--
用于添加文章页面中展示分类列表
-->
<script setup>
import { ref, watch } from 'vue'
import { getNoPaginationCategoryListService } from '@/api/category.js'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: [Number, String],
  },
})
const emit = defineEmits(['update:modelValue'])

const categoryList = ref([])
const loadCategoryList = async () => {
  try {
    const result = await getNoPaginationCategoryListService()
    categoryList.value = result.data
  } catch (error) {
    ElMessage.error(error.message)
  }
}
loadCategoryList()

// 双向绑定：当 categoryId 更新时，触发事件更新父组件的值
const categoryId = ref(props.modelValue)
watch(categoryId, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<template>
  <div class="space-y-2">
    <span class="text-base text-zinc-500 dark:text-white font-bold">分类</span>
    <div class="bg-gray-100 dark:bg-zinc-800 p-2 rounded-md">
      <el-radio-group v-model="categoryId">
        <span v-for="category in categoryList" :key="category.id" class="m-1">
          <el-radio :value="category.id" :label="category.categoryName" border />
        </span>
      </el-radio-group>
    </div>
  </div>
</template>
