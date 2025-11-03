// src/main.js
// Este es el 'main.js' correcto para un proyecto de VITE

import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css' // Importamos los estilos globales

// Crea y monta la aplicación
const app = createApp(App)
app.mount('#app')
