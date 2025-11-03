<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Tienda "La Composición"</h1>

    <!-- Notificación flotante -->
    <transition name="fade">
      <div
        v-if="notification"
        class="fixed top-5 right-5 bg-green-500 text-white py-3 px-6 rounded-lg shadow-xl z-50"
      >
        {{ notification }}
      </div>
    </transition>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Columna Izquierda: Filtros y Lista de Productos -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Sección de Filtros -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Filtros</h2>
          <div class="flex flex-col md:flex-row gap-4">
            <search-bar
              v-model="searchTerm"
              placeholder="Buscar por nombre..."
              class="flex-grow"
            ></search-bar>

            <category-filter
              v-model="selectedCategory"
              :categories="categories"
              class="md:w-1/3"
            ></category-filter>
          </div>
        </div>

        <!-- Sección de Lista de Productos -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Productos</h2>
          <product-list
            :products="filteredProducts"
            :loading="loading"
            @add-to-cart="handleAddToCart"
          ></product-list>
        </div>
      </div>

      <!-- Columna Derecha: Carrito de Compras -->
      <div class="lg:col-span-1">
        <shopping-cart></shopping-cart>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useProducts } from './composables/useProducts.js'
import { useCart } from './composables/useCart.js'

// Importamos los componentes hijos
import SearchBar from './components/SearchBar.vue'
import CategoryFilter from './components/CategoryFilter.vue'
import ProductList from './components/ProductList.vue'
import ShoppingCart from './components/ShoppingCart.vue'

// --- 1. Lógica de Productos ---
const { loading, searchTerm, selectedCategory, categories, filteredProducts } = useProducts()

// --- 2. Lógica de Carrito ---
const { addItem } = useCart()

// --- 3. Lógica Local (Notificaciones) ---
const notification = ref('')

function showNotification(message) {
  notification.value = message
  setTimeout(() => {
    notification.value = ''
  }, 2000)
}

// --- 4. Manejador de Eventos ---
const handleAddToCart = (product) => {
  addItem(product)
  showNotification(`${product.name} añadido al carrito!`)
}

// --- 5. Watcher ---
watch(searchTerm, (newValue, oldValue) => {
  if (newValue.length > 0) {
    console.log(`Búsqueda cambió de '${oldValue}' a '${newValue}'`)
  }
})
</script>
