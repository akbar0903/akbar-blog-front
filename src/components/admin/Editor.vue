<script setup>
import { MdEditor, DropdownToolbar } from 'md-editor-v3'
import { ref, watch } from 'vue'
import { useAdminStore } from '@/stores/index.js'
import { fileUploadService } from '@/api/upload.js'
import { ElMessage } from 'element-plus'

// 子组件数据跟父组件进行双向绑定
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
  0,
  '=',
  1,
  'pageFullscreen',
  'previewOnly',
  'preview',
  'catalog',
]

// 预览主题选择按钮
const previewTheme = ref(['default', 'github', 'vuepress', 'mk-cute', 'smart-blue', 'cyanosis'])

const previewThemeVisible = ref(false)
const previewThemeOnChange = () => {
  previewThemeVisible.value = !previewThemeVisible.value
}
const previewSelectedTheme = ref('default')
const previewThemeHandler = (previewTheme) => {
  previewSelectedTheme.value = previewTheme
}

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
const codeThemeVisible = ref(false)
const codeThemeOnChange = () => {
  codeThemeVisible.value = !codeThemeVisible.value
}
const selectedCodeTheme = ref('github')
const codeThemeHandler = (codeTheme) => {
  selectedCodeTheme.value = codeTheme
}

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
      <DropdownToolbar title="主题" :visible="previewThemeVisible" :onChange="previewThemeOnChange">
        <template #overlay>
          <div class="border border-solid border-[#e6e6e6] rounded-sm">
            <ol>
              <li
                v-for="(theme, index) in previewTheme"
                :key="index"
                class="py-1 px-2 hover:bg-[#f5f7fa] dark:hover:bg-zinc-800 cursor-pointer"
                @click="previewThemeHandler(theme)"
              >
                {{ theme }}
              </li>
            </ol>
            <ol>
              <li class="py-1 px-2 font-bold text-blue-500 dark:text-blue-500">
                {{ previewSelectedTheme }}
              </li>
            </ol>
          </div>
        </template>
        <template #trigger>
          <icon-mdi-compare />
        </template>
      </DropdownToolbar>
      <DropdownToolbar
        title="代码块儿主题"
        :visible="codeThemeVisible"
        :onChange="codeThemeOnChange"
      >
        <template #overlay>
          <div class="border border-solid border-[#e6e6e6] rounded-sm">
            <ol>
              <li
                v-for="(theme, index) in codeTheme"
                :key="index"
                class="py-1 px-2 hover:bg-[#f5f7fa] dark:hover:bg-zinc-800 cursor-pointer"
                @click="codeThemeHandler(theme)"
              >
                {{ theme }}
              </li>
            </ol>
            <ol>
              <li class="py-1 px-2 font-bold text-blue-500 dark:text-blue-500">
                {{ selectedCodeTheme }}
              </li>
            </ol>
          </div>
        </template>
        <template #trigger>
          <icon-mdi-code-not-equal-variant />
        </template>
      </DropdownToolbar>
    </template>
  </MdEditor>
</template>
