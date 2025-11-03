<template>
  <div class="relative">
    <input
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      type="text"
      class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <span
      class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      v-html="icons.search"
    ></span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import icons from '../assets/icons.js'

// defineProps y defineEmits son "macros" de <script setup>
defineProps(['modelValue', 'placeholder'])
const emit = defineEmits(['update:modelValue'])

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>
