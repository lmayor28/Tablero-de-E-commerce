// src/composables/useProducts.js
import { ref, computed, onMounted } from 'vue'
import { useApi } from './useApi.js'

export function useProducts() {
  const { loading, error, fetchProducts } = useApi()

  // const api = useApi()
  // const loading = api.loading
  // const error = api.error
  // const fetchProducts = api.fetchProducts

  // --- State (ref) ---
  const allProducts = ref([])
  const searchTerm = ref('')
  const selectedCategory = ref('all')

  // --- Lifecycle (onMounted) ---
  onMounted(async () => {
    allProducts.value = await fetchProducts()
  })

  // --- Computed Properties ---
  const categories = computed(() => {
    const allCategories = allProducts.value.map((p) => p.category)
    return ['all', ...new Set(allCategories)]
  })

  const filteredProducts = computed(() => {
    console.log('Calculando productos filtrados...')
    let products = allProducts.value

    if (selectedCategory.value !== 'all') {
      products = products.filter((p) => p.category === selectedCategory.value)
    }

    if (searchTerm.value) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.value.toLowerCase()),
      )
    }
    return products
  })

  return {
    loading,
    error,
    searchTerm,
    selectedCategory,
    categories,
    filteredProducts,
  }
}
