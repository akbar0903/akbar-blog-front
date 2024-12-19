<script setup>
import { MdEditor } from 'md-editor-v3'
import { ref, watch } from 'vue'
import { useAdminStore } from '@/stores/index.js'
import { fileUploadService } from '@/api/upload.js'
import { ElMessage } from 'element-plus'
import ThemeDropdown from '@/components/admin/ThemeDropdown.vue'

// 双向绑定
const content = defineModel()

// 切换编辑器主题
const adminStore = useAdminStore()
const editorTheme = ref(adminStore.getTheme() || 'light')
watch(
  () => adminStore.theme,
  (newTheme) => {
    editorTheme.value = newTheme || 'light'
  },
)

// 删除不需要的工具
//const toolbarsExclude = ['github', 'htmlPreview', 'fullscreen', 'preview', 'prettier']
const toolbars = [
  'bold',
  'underline',
  'italic',
  '-',
  'title',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'mermaid',
  'katex',
  '-',
  'revoke',
  'next',
  'save',
  '=',
  0,
  1,
  'pageFullscreen',
  'previewOnly',
  'preview',
  'catalog',
]

// 预览主题
const previewTheme = ref(['default', 'github', 'vuepress', 'mk-cute', 'smart-blue', 'cyanosis'])
const previewSelectedTheme = ref('default')

// 代码块主题
const codeTheme = ref([
  'atom',
  'a11y',
  'github',
  'gradient',
  'kimbie',
  'paraiso',
  'qtcreator',
  'stackoverflow',
])
const selectedCodeTheme = ref('github')

// 图片上传
const onUploadImg = async (files, callback) => {
  try {
    const result = await fileUploadService(files[0])
    const imageUrl = result.data
    callback([
      {
        url: imageUrl,
        alt: files[0].name,
        title: files[0].name,
      },
    ])
    ElMessage.success('图片上传成功！')
  } catch (error) {
    ElMessage.error('图片上传失败！' + error.message)
  }
}
</script>

<template>
  <MdEditor
    v-model="content"
    :theme="editorTheme"
    :toolbars="toolbars"
    noPrettier
    :previewTheme="previewSelectedTheme"
    :codeTheme="selectedCodeTheme"
    noMermaid
    :codeFoldable="false"
    @onUploadImg="onUploadImg"
  >
    <template #defToolbars>
      <ThemeDropdown
        title="预览主题"
        :themes="previewTheme"
        v-model="previewSelectedTheme"
      >
        <template #icon>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2H2.66667C2.29848 2 2 2.29848 2 2.66667V6C2 6.36819 2.29848 6.66667 2.66667 6.66667H6C6.36819 6.66667 6.66667 6.36819 6.66667 6V2.66667C6.66667 2.29848 6.36819 2 6 2Z" stroke="#1D2129" stroke-width="1.33" stroke-linejoin="round"></path>
            <path d="M6 9.3335H2.66667C2.29848 9.3335 2 9.63197 2 10.0002V13.3335C2 13.7017 2.29848 14.0002 2.66667 14.0002H6C6.36819 14.0002 6.66667 13.7017 6.66667 13.3335V10.0002C6.66667 9.63197 6.36819 9.3335 6 9.3335Z" stroke="#1D2129" stroke-width="1.33" stroke-linejoin="round"></path>
            <path d="M13.3334 2H10C9.63185 2 9.33337 2.29848 9.33337 2.66667V6C9.33337 6.36819 9.63185 6.66667 10 6.66667H13.3334C13.7016 6.66667 14 6.36819 14 6V2.66667C14 2.29848 13.7016 2 13.3334 2Z" stroke="#1D2129" stroke-width="1.33" stroke-linejoin="round"></path>
            <path d="M13.3334 9.3335H10C9.63185 9.3335 9.33337 9.63197 9.33337 10.0002V13.3335C9.33337 13.7017 9.63185 14.0002 10 14.0002H13.3334C13.7016 14.0002 14 13.7017 14 13.3335V10.0002C14 9.63197 13.7016 9.3335 13.3334 9.3335Z" stroke="#1D2129" stroke-width="1.33" stroke-linejoin="round"></path>
          </svg>
        </template>
      </ThemeDropdown>
      <ThemeDropdown title="代码主题" :themes="codeTheme" v-model="selectedCodeTheme">
        <template #icon>
          <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"></rect><path d="M6 44L6 25H12V17H36V25H42V44H6Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"></path><path d="M17 17V8L31 4V17" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </template>
      </ThemeDropdown>
    </template>
  </MdEditor>
</template>
