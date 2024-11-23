<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  textClass: {
    type: String,
    default: 'text-blue-500',
  },
  iconClass: {
    type: String,
    default: 'text-blue-500 group-hover:bg-blue-500',
  },
})
</script>

<template>
  <div class="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-3">
    <div
      class="group card overflow-hidden flex flex-col bg-white rounded-xl cursor-pointer dark:bg-zinc-900"
    >
      <div class="flex items-center justify-between pt-4 px-4">
        <span
          :class="props.iconClass"
          class="p-1 text-5xl rounded-xl group-hover:text-white transition duration-300 ease-in-out"
        >
          <slot name="icon"> </slot>
        </span>
        <div>
          <slot name="title">
            <span :class="props.textClass" class="block whitespace-nowrap text-center"
              >{{ title }}
            </span>
          </slot>
          <slot name="value">
            <span :class="props.textClass" class="block text-3xl font-bold">{{ value }} </span>
          </slot>
        </div>
      </div>
      <slot name="img"> </slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  box-shadow: var(--my-base-box-shadow);
}
</style>
