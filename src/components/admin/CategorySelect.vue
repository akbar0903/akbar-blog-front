<script setup>
import { ref } from 'vue'
import { getNoPaginationCategoryListService } from '@/api/category.js'
import { ElMessage } from 'element-plus'

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

defineProps({
  modelValue: {
    type: [Number, String],
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <el-select
    :model-value="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    clearable
    placeholder="文章分类"
  >
    <el-option
      v-for="category in categoryList"
      :key="category.id"
      :label="category.categoryName"
      :value="category.id"
    >
    </el-option>
  </el-select>
</template>
