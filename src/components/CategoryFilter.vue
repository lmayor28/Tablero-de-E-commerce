<template>
  <select
    :value="modelValue"
    @change="onChange"
    class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option v-for="category in categories" :key="category" :value="category">
      {{ category === 'all' ? 'Todas las categorías' : category }}
    </option>
  </select>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps(['modelValue', 'categories'])
const emit = defineEmits(['update:modelValue'])

const onChange = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>
