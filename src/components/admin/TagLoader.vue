<!--
用于添加文章页面中展示标签列表
-->

<script setup>
import { ref, watch } from 'vue'
import { getNoPaginationTagListService } from '@/api/tag.js'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Array,
  },
})
const emit = defineEmits(['update:modelValue'])

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

// 双向绑定：当 tagIds 更新时，触发事件更新父组件的值
const tagIds = ref(props.modelValue)

watch(tagIds, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <div class="space-y-2">
    <span class="text-base text-zinc-500 dark:text-white font-bold">标签</span>
    <div class="bg-gray-100 dark:bg-zinc-800 p-2 rounded-md">
      <el-checkbox-group v-model="tagIds" :max="3">
        <span v-for="tag in tagList" :key="tag.id">
          <el-checkbox :label="tag.tagName" :value="tag.id" border class="m-1" />
        </span>
      </el-checkbox-group>
    </div>
  </div>
</template>
