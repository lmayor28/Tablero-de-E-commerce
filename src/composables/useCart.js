// src/composables/useCart.js
import { reactive, computed } from 'vue'

// Estado reactivo centralizado (singleton) para el carrito
const cart = reactive({
  items: [], // Estructura: { id, name, price, quantity, img }
})

export function useCart() {
  // --- Computed Properties ---
  const totalItems = computed(() => {
    return cart.items.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  // --- Métodos ---
  function addItem(product) {
    const existingItem = cart.items.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.items.push({ ...product, quantity: 1 })
    }
    console.log('Carrito actualizado:', cart.items)
  }

  function removeItem(productId) {
    cart.items = cart.items.filter((item) => item.id !== productId)
  }

  function updateQuantity(productId, newQuantity) {
    const item = cart.items.find((item) => item.id === productId)
    if (item) {
      if (newQuantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = newQuantity
      }
    }
  }

  function clearCart() {
    cart.items = []
  }

  // Exponemos el estado reactivo y las funciones
  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  }
}
