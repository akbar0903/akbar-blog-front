<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  with: {
    type: String,
    default: '16',
  },
  height: {
    type: String,
    default: '16',
  },
  color: {
    type: String,
  },
  propClass: {
    type: String,
    default: '',
  },
})

const width = props.with
const height = props.height
const color = props.color
const propClass = props.propClass
</script>

<template>
  <svg t="1732184020779" :class="propClass" viewBox="0 0 1109 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28259" :width="width" :height="height"><path d="M0.000427 512a85.333333 85.333333 0 0 1 85.205333-85.333333h938.922667c47.061333 0 85.205333 38.186667 85.205333 85.333333a85.333333 85.333333 0 0 1-85.205333 85.333333H85.20576A85.077333 85.077333 0 0 1 0.000427 512zM0.000427 85.333333C0.000427 38.186667 38.10176 0 84.992427 0h470.016C601.94176 0 640.000427 37.888 640.000427 85.333333c0 47.146667-38.101333 85.333333-84.992 85.333334H84.992427C38.059093 170.666667 0.000427 132.778667 0.000427 85.333333z m469.333333 853.333334c0-47.146667 38.101333-85.333333 84.992-85.333334h470.016c46.933333 0 84.992 37.888 84.992 85.333334 0 47.146667-38.101333 85.333333-84.992 85.333333H554.32576c-46.933333 0-84.992-37.888-84.992-85.333333z" :fill="color" p-id="28260"></path></svg>
</template>
