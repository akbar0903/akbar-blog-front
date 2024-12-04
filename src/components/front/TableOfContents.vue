<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  selector: {
    type: String,
    default: 'h2, h3',
  },
})

const headings = ref([])
const activeId = ref('')
const route = useRoute()

const generateId = (text) => {
  return text.toLowerCase().replace(/\s+/g, '-')
}

const getHeadings = () => {
  setTimeout(() => {
    const article = document.querySelector('.article-content')

    if (!article) return

    const elements = article.querySelectorAll(props.selector)

    headings.value = Array.from(elements).map((element) => {
      const id = generateId(element.textContent)
      element.id = id

      return {
        id,
        text: element.textContent,
        level: parseInt(element.tagName.charAt(1)),
        top: element.offsetTop,
      }
    })
  }, 300)
}

const scrollToHeading = (id) => {
  const element = document.getElementById(id)
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 100,
      behavior: 'smooth',
    })
  }
}

const onScroll = () => {
  if (headings.value.length === 0) return

  const scrollPosition = window.scrollY + 150

  for (let i = headings.value.length - 1; i >= 0; i--) {
    if (scrollPosition >= headings.value[i].top) {
      activeId.value = headings.value[i].id
      break
    }
  }
}

watch(
  () => route.path,
  (newPath, oldPath) => {
    if (newPath !== oldPath) {
      headings.value = []
      activeId.value = ''
      getHeadings()
    }
  },
  { immediate: true },
)

onMounted(() => {
  getHeadings()
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div v-if="headings.length > 0" class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-lg font-bold text-gray-800 mb-4">文章目录</h3>
    <nav class="space-y-2">
      <a
        v-for="heading in headings"
        :key="heading.id"
        :href="`#${heading.id}`"
        @click.prevent="scrollToHeading(heading.id)"
        :class="[
          'block text-sm hover:text-blue-600 transition-colors cursor-pointer',
          heading.level === 3 ? 'pl-4' : '',
          activeId === heading.id ? 'text-blue-600 font-medium' : 'text-gray-600',
        ]"
      >
        {{ heading.text }}
      </a>
    </nav>
  </div>
</template>
