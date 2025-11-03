<template>
  <!-- Estado de Carga -->
  <div v-if="loading" class="flex justify-center items-center h-64">
    <div v-html="icons.loader"></div>
  </div>

  <!-- Sin productos -->
  <div v-else-if="!products.length" class="text-center text-gray-500 py-10">
    <p>No se encontraron productos que coincidan con su búsqueda.</p>
  </div>

  <!-- Lista de Productos -->
  <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    <product-card
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-cart="handleAddToCart"
    ></product-card>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import icons from '../assets/icons.js'
import ProductCard from './ProductCard.vue' // Importamos el componente hijo

defineProps(['products', 'loading'])
const emit = defineEmits(['addToCart'])

const handleAddToCart = (product) => {
  emit('addToCart', product)
}
</script>
