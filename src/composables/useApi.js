// src/composables/useApi.js
import { ref } from 'vue'

const mockDatabase = [
  {
    id: 1,
    name: 'Laptop Pro',
    price: 1200,
    category: 'Electrónica',
    img: 'https://placehold.co/600x400/3498db/ffffff?text=Laptop',
  },
  {
    id: 2,
    name: 'Silla de Oficina Ergonómica',
    price: 250,
    category: 'Hogar',
    img: 'https://placehold.co/600x400/2ecc71/ffffff?text=Silla',
  },
  {
    id: 3,
    name: 'Cafetera Express',
    price: 150,
    category: 'Hogar',
    img: 'https://placehold.co/600x400/e74c3c/ffffff?text=Cafetera',
  },
  {
    id: 4,
    name: 'Teclado Mecánico',
    price: 180,
    category: 'Electrónica',
    img: 'https://placehold.co/600x400/9b59b6/ffffff?text=Teclado',
  },
  {
    id: 5,
    name: 'Monitor Ultrawide',
    price: 700,
    category: 'Electrónica',
    img: 'https://placehold.co/600x400/f1c40f/000000?text=Monitor',
  },
  {
    id: 6,
    name: 'Set de Mancuernas',
    price: 120,
    category: 'Deporte',
    img: 'https://placehold.co/600x400/1abc9c/ffffff?text=Mancuernas',
  },
  {
    id: 7,
    name: 'Lapicera',
    price: 1200,
    category: 'Utiles',
    img: 'https://placehold.co/600x400/1a229c/ffffff?text=Lapicera',
  },
]

export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  const fetchProducts = () => {
    loading.value = true
    error.value = null
    console.log('API: Iniciando fetch de productos...')
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('API: Productos recibidos.')
        loading.value = false
        resolve([...mockDatabase])
      }, 800)
    })
  }

  return { loading, error, fetchProducts }
}
