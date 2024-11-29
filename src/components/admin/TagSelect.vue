<script setup>
import { getNoPaginationTagListService } from '@/api/tag.js'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const tagList = ref([])
const loadTagList = async () => {
  try {
    const result = await getNoPaginationTagListService()
    tagList.value = result.data
  } catch (error) {
    ElMessage.error(error.message)
  }
}
loadTagList()

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
    placeholder="标签"
  >
    <el-option
      v-for="category in tagList"
      :key="category.id"
      :label="category.tagName"
      :value="category.id"
    >
    </el-option>
  </el-select>
</template>
