<script setup>
import { DropdownToolbar } from 'md-editor-v3'
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: String,
  themes: Array,
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])
const selectTheme = (theme) => {
  emit('update:modelValue', theme)
}

const dropdownVisible = ref(false)
const toggleVisible = () => {
  dropdownVisible.value = !dropdownVisible.value
}
</script>

<template>
  <DropdownToolbar :title="props.title" :visible="dropdownVisible" :onChange="toggleVisible">
    <!-- 可以替换成自己的icon图标 -->
    <template #default>
      <slot name="icon"> </slot>
    </template>
    <template #overlay>
      <ul class="dropdown-menu">
        <li
          v-for="theme in props.themes"
          :key="theme"
          @click="selectTheme(theme)"
          class="dropdown-menu-item"
          :class="{ selected: theme === props.modelValue }"
        >
          {{ theme }}
        </li>
      </ul>
    </template>
  </DropdownToolbar>
</template>

<style scoped>
.dropdown-menu {
  max-height: 300px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  list-style: none;
  overflow-y: auto;
}

.dropdown-menu-item {
  padding: 4px 10px;
  font-size: 14px;
  cursor: pointer;
}
.dropdown-menu-item:first-child {
  padding-top: 8px;
}
.dropdown-menu-item:last-child {
  padding-bottom: 8px;
}
.dropdown-menu-item.selected {
  font-weight: 700;
  color: #2563eb;
}
.dropdown-menu-item:hover {
  background-color: #f5f7fa;
}
</style>
