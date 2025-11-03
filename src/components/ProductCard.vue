<template>
  <div
    class="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
  >
    <img
      :src="product.img"
      :alt="product.name"
      class="w-full h-48 object-cover"
      onerror="this.src='https://placehold.co/600x400/cccccc/ffffff?text=Error'"
    />
    <div class="p-4">
      <h3 class="text-lg font-semibold">{{ product.name }}</h3>
      <p class="text-sm text-gray-500 mb-2">{{ product.category }}</p>
      <div class="flex justify-between items-center">
        <span class="text-xl font-bold text-gray-800">$ {{ product.price }}</span>
        <button
          @click="onAddToCart"
          class="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          <span v-html="icons.plus"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import icons from '../assets/icons.js'

const props = defineProps({
  product: { type: Object, required: true },
})
const emit = defineEmits(['addToCart'])

const onAddToCart = () => {
  emit('addToCart', props.product)
}
</script>
