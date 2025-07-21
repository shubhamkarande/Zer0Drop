<template>
  <div class="min-h-screen bg-gray-900 text-white transition-colors duration-300" :class="{ 'bg-gray-50 text-gray-900': !store.isDarkMode }">
    <Navbar v-if="showNavbar" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { store, actions } from './store'

const route = useRoute()

const showNavbar = computed(() => {
  return route.name !== 'Landing'
})

onMounted(() => {
  actions.initializeApp()
})
</script>