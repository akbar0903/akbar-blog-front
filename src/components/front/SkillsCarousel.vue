<script setup>
const skillsRow1 = [
  { name: 'JavaScript', color: 'bg-yellow-500' },
  { name: 'Vue.js', color: 'bg-green-500' },
  { name: 'CSS3', color: 'bg-blue-500' },
  { name: 'HTML5', color: 'bg-orange-500' },
  { name: 'Java', color: 'bg-red-500' },
  { name: 'SQL', color: 'bg-purple-500' },
  { name: 'Git', color: 'bg-gray-700' },
  { name: 'Node.js', color: 'bg-green-600' },
  { name: 'TypeScript', color: 'bg-blue-600' },
  { name: 'React', color: 'bg-blue-400' },
]

const skillsRow2 = [
  { name: 'PHP', color: 'bg-indigo-500' },
  { name: 'MySQL', color: 'bg-blue-700' },
  { name: 'MongoDB', color: 'bg-green-700' },
  { name: 'Docker', color: 'bg-blue-500' },
  { name: 'Linux', color: 'bg-yellow-600' },
  { name: 'Redis', color: 'bg-red-600' },
  { name: 'Webpack', color: 'bg-blue-800' },
  { name: 'Vite', color: 'bg-purple-600' },
  { name: 'Python', color: 'bg-yellow-700' },
  { name: 'Nginx', color: 'bg-green-800' },
]

// 复制四份技能列表
const repeatedSkills1 = [...skillsRow1, ...skillsRow1, ...skillsRow1, ...skillsRow1]
const repeatedSkills2 = [...skillsRow2, ...skillsRow2, ...skillsRow2, ...skillsRow2]
</script>

<template>
  <div class="w-full overflow-hidden bg-white rounded-lg shadow-md p-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">技能专长</h3>
    <!-- 第一行：从右向左 -->
    <div class="relative overflow-hidden py-2 mb-4 carousel-container">
      <div class="flex">
        <div class="skills-scroll-left flex">
          <div
            v-for="(skill, index) in repeatedSkills1"
            :key="`${skill.name}-${index}`"
            class="px-2"
          >
            <span
              class="inline-flex items-center px-4 py-2 rounded-full text-white text-sm font-medium"
              :class="skill.color"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>
        <div class="skills-scroll-left flex">
          <div
            v-for="(skill, index) in repeatedSkills1"
            :key="`${skill.name}-second-${index}`"
            class="px-2"
          >
            <span
              class="inline-flex items-center px-4 py-2 rounded-full text-white text-sm font-medium"
              :class="skill.color"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 第二行：从左向右 -->
    <div class="relative overflow-hidden py-2 carousel-container">
      <div class="flex">
        <div class="skills-scroll-right flex">
          <div
            v-for="(skill, index) in repeatedSkills2"
            :key="`${skill.name}-${index}`"
            class="px-2"
          >
            <span
              class="inline-flex items-center px-4 py-2 rounded-full text-white text-sm font-medium"
              :class="skill.color"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>
        <div class="skills-scroll-right flex">
          <div
            v-for="(skill, index) in repeatedSkills2"
            :key="`${skill.name}-second-${index}`"
            class="px-2"
          >
            <span
              class="inline-flex items-center px-4 py-2 rounded-full text-white text-sm font-medium"
              :class="skill.color"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 从右向左滚动 */
.skills-scroll-left {
  animation: scrollLeft 140s linear infinite;
  will-change: transform;
}

/* 从左向右滚动 */
.skills-scroll-right {
  animation: scrollRight 140s linear infinite;
  will-change: transform;
}

@keyframes scrollLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes scrollRight {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* 鼠标悬停时暂停动画 - 修改为父容器控制 */
.carousel-container:hover .skills-scroll-left,
.carousel-container:hover .skills-scroll-right {
  animation-play-state: paused;
}

/* 确保动画平滑 */
.skills-scroll-left,
.skills-scroll-right {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
</style>
