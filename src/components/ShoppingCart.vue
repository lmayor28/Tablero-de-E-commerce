<template>
  <div class="bg-white p-6 rounded-lg shadow-md sticky top-10">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Carrito</h2>
      <div class="flex items-center gap-2 text-gray-600">
        <span v-html="icons.cart"></span>
        <span>{{ totalItems }} items</span>
      </div>
    </div>

    <!-- Carrito Vacío -->
    <div v-if="!cart.items.length" class="text-center text-gray-500 py-10">
      <p>Tu carrito está vacío.</p>
    </div>

    <!-- Lista de Items -->
    <ul v-else class="divide-y max-h-96 overflow-y-auto pr-2">
      <cart-item
        v-for="item in cart.items"
        :key="item.id"
        :item="item"
        @update-quantity="updateQuantity"
        @remove-item="removeItem"
      ></cart-item>
    </ul>

    <!-- Total -->
    <div v-if="cart.items.length" class="mt-6 pt-6 border-t">
      <div class="flex justify-between items-center text-lg font-bold">
        <span>Total:</span>
        <span>$ {{ totalPrice }}</span>
      </div>
      <button
        class="w-full bg-green-600 text-white py-3 rounded-lg mt-4 font-semibold hover:bg-green-700 transition-colors"
      >
        Proceder al Pago
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '../composables/useCart.js'
import icons from '../assets/icons.js'
import CartItem from './CartItem.vue' // Importamos el componente hijo

// Obtenemos toda la lógica y el estado del composable del carrito
const { cart, totalItems, totalPrice, updateQuantity, removeItem } = useCart()
</script>
