<template>
  <li class="flex items-center gap-4 py-4 border-b">
    <img
      :src="item.img"
      :alt="item.name"
      class="w-16 h-16 object-cover rounded-lg"
      onerror="this.src='https://placehold.co/100x100/cccccc/ffffff?text=Error'"
    />
    <div class="flex-grow">
      <h4 class="font-semibold">{{ item.name }}</h4>
      <p class="text-sm text-gray-600">$ {{ item.price }}</p>

      <!-- Controles de Cantidad -->
      <div class="flex items-center gap-2 mt-2">
        <button @click="onDecrease" class="border p-1 rounded hover:bg-gray-100">
          <span v-html="icons.minus"></span>
        </button>
        <span class="w-8 text-center">{{ item.quantity }}</span>
        <button @click="onIncrease" class="border p-1 rounded hover:bg-gray-100">
          <span v-html="icons.plus"></span>
        </button>
      </div>
    </div>
    <div class="text-right">
      <span class="font-semibold">$ {{ itemTotal }}</span>
      <button @click="onRemove" class="text-red-500 hover:text-red-700 ml-2 mt-1">
        <span v-html="icons.trash"></span>
      </button>
    </div>
  </li>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import icons from '../assets/icons.js'

const props = defineProps({
  item: { type: Object, required: true },
  userName: { type: String, required: true },
})

const emit = defineEmits(['updateQuantity', 'removeItem'])

const onIncrease = () => {
  emit('updateQuantity', props.item.id, props.item.quantity + 1)
}
const onDecrease = () => {
  emit('updateQuantity', props.item.id, props.item.quantity - 1)
}
const onRemove = () => {
  emit('removeItem', props.item.id)
}

const itemTotal = computed(() => props.item.price * props.item.quantity)
</script>
