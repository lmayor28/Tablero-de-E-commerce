
---

# Tablero de E-commerce con Vue 3

Este proyecto es un tablero de e-commerce interactivo construido con Vue 3 (Composition API) y Vite.

A diferencia de usar una biblioteca de estado global como Pinia, este proyecto demuestra un patrón de gestión de estado ágil y potente utilizando exclusivamente **Composables de Vue** para encapsular y compartir la lógica de negocio y el estado de la aplicación.

## Arquitectura basada en Composables

La lógica de la aplicación se divide en tres composables principales que se encuentran en `src/composables/`:

### `useApi.js` (Capa de Servicio)

*   Simula una API externa para obtener datos.
*   Contiene la `mockDatabase` (base de datos de productos de ejemplo).
*   Expone el estado de `loading` y `error`, y la función `fetchProducts` que devuelve una promesa con un `setTimeout` para simular la asincronía.

### `useProducts.js` (Lógica de Estado Localizado)

*   Este composable es "con estado" (stateful) y se instancia dentro de `App.vue`.
*   Utiliza `useApi()` para cargar la lista completa de productos (`allProducts`) en `onMounted`.
*   Maneja el estado de los filtros: `searchTerm` y `selectedCategory`.
*   Expone dos propiedades computadas clave: `categories` (para el dropdown de filtro) y `filteredProducts` (que reacciona a los cambios en `searchTerm` y `selectedCategory` para devolver la lista de productos a mostrar).

### `useCart.js` (Estado Global Singleton)

*   Este es el núcleo de la gestión de estado del carrito. Utiliza un objeto `reactive` de Vue (`cart`) definido en el ámbito raíz del módulo (patrón singleton).
*   Cualquier componente que importe y llame a `useCart()` recibe la misma instancia reactiva del carrito.
*   Expone métodos para manipular el carrito (`addItem`, `removeItem`, `updateQuantity`).
*   Expone propiedades computadas (`totalItems`, `totalPrice`) que se actualizan automáticamente.

## Flujo de Datos y Componentes

La aplicación se estructura de la siguiente manera:

*   **`App.vue`**:
    *   Actúa como el componente "controlador" principal.
    *   Inicializa `useProducts()` y posee el estado de los filtros.
    *   Pasa `filteredProducts` y `loading` como props a `ProductList`.
    *   Pasa las `categories` como props a `CategoryFilter`.
    *   Usa `v-model` para vincular `searchTerm` con `SearchBar` y `selectedCategory` con `CategoryFilter`.
    *   Escucha el evento `@add-to-cart` de `ProductList` y llama a la función `addItem` de `useCart()`.
    *   Muestra una notificación de "producto añadido".

*   **`ProductList.vue` y `ProductCard.vue`**:
    *   Componentes "tontos" (presentacionales).
    *   Reciben datos a través de props (flujo "props down").
    *   Comunican acciones al padre a través de eventos (flujo "events up").

*   **`ShoppingCart.vue` y `CartItem.vue`**:
    *   No reciben props del carrito.
    *   Importan y utilizan `useCart()` directamente.
    *   Gracias al patrón singleton, leen el estado (`cart`, `totalPrice`) y llaman a las acciones (`updateQuantity`, `removeItem`) directamente desde el composable, desacoplando totalmente el carrito del resto de la aplicación.

## Características

*   **Carga Asíncrona**: Muestra un estado de carga (loader) mientras se "obtienen" los productos.
*   **Filtro por Categoría**: Filtra la lista de productos por categoría.
*   **Búsqueda por Nombre**: Filtra la lista de productos por un término de búsqueda en tiempo real.
*   **Carrito Reactivo**: El carrito se actualiza en todos los componentes que lo usan sin necesidad de pasar props.
*   **Notificaciones**: Muestra un mensaje temporal al añadir un ítem al carrito.

## Tecnologías Utilizadas

*   **Vue 3**: Framework principal, utilizando la sintaxis `<script setup>` (Composition API).
*   **Vite**: Herramienta de frontend para el desarrollo y compilación.
*   **Tailwind CSS (via CDN)**: Framework de CSS para un prototipado rápido de la UI.
*   **ESLint, Prettier, OXLint**: Herramientas de linting y formateo para mantener la calidad del código.

## Instalación y Uso

1.  **Instalar dependencias**
    ```bash
    npm install
    ```

2.  **Iniciar el servidor de desarrollo**
    ```bash
    npm run dev
    ```
    Este comando inicia el servidor de desarrollo con Hot-Reload. Abre la URL indicada en la consola (usualmente `http://localhost:5173`).

3.  **Compilar para producción**
    ```bash
    npm run build
    ```
    Este comando compila y minimiza la aplicación para ser desplegada en producción.

## Scripts Disponibles

*   `npm run dev`: Inicia el servidor de desarrollo con hot-reload.
*   `npm run build`: Compila y minifica el proyecto para producción.
*   `npm run preview`: Sirve localmente la compilación de producción para previsualizar el resultado final.
*   `npm run lint`: Ejecuta ESLint y OXLint para analizar y corregir problemas de calidad en el código.
*   `npm run format`: Formatea todo el código fuente utilizando Prettier.
