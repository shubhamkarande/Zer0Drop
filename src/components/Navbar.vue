<template>
  <nav class="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50" :class="{ 'bg-white/50 border-gray-200': !store.isDarkMode }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-8">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center">
              <span class="text-white font-bold text-sm">Z</span>
            </div>
            <span class="text-xl font-bold">Zer0Drop</span>
          </router-link>
          
          <div class="hidden md:flex space-x-6">
            <router-link 
              to="/dashboard" 
              class="text-gray-300 hover:text-cyan-400 transition-colors"
              :class="{ 'text-gray-600 hover:text-blue-600': !store.isDarkMode }"
              active-class="text-cyan-400"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/upload" 
              class="text-gray-300 hover:text-cyan-400 transition-colors"
              :class="{ 'text-gray-600 hover:text-blue-600': !store.isDarkMode }"
              active-class="text-cyan-400"
            >
              Upload
            </router-link>
            <router-link 
              to="/settings" 
              class="text-gray-300 hover:text-cyan-400 transition-colors"
              :class="{ 'text-gray-600 hover:text-blue-600': !store.isDarkMode }"
              active-class="text-cyan-400"
            >
              Settings
            </router-link>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <div v-if="store.isWalletConnected" class="hidden sm:flex items-center space-x-2 bg-gray-700/50 px-3 py-1 rounded-full" :class="{ 'bg-gray-200/50': !store.isDarkMode }">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-sm font-mono">{{ shortAddress }}</span>
          </div>
          
          <button
            @click="actions.toggleDarkMode"
            class="p-2 rounded-full hover:bg-gray-700 transition-colors"
            :class="{ 'hover:bg-gray-200': !store.isDarkMode }"
          >
            <svg v-if="store.isDarkMode" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>

          <!-- Mobile menu button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 rounded-full hover:bg-gray-700 transition-colors" :class="{ 'hover:bg-gray-200': !store.isDarkMode }">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-700" :class="{ 'border-gray-200': !store.isDarkMode }">
        <router-link to="/dashboard" class="block py-2 text-gray-300 hover:text-cyan-400" :class="{ 'text-gray-600 hover:text-blue-600': !store.isDarkMode }">Dashboard</router-link>
        <router-link to="/upload" class="block py-2 text-gray-300 hover:text-cyan-400" :class="{ 'text-gray-600 hover:text-blue-600': !store.isDarkMode }">Upload</router-link>
        <router-link to="/settings" class="block py-2 text-gray-300 hover:text-cyan-400" :class="{ 'text-gray-600 hover:text-blue-600': !store.isDarkMode }">Settings</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { store, actions } from '../store'

const mobileMenuOpen = ref(false)

const shortAddress = computed(() => {
  if (!store.walletAddress) return ''
  return `${store.walletAddress.slice(0, 6)}...${store.walletAddress.slice(-4)}`
})
</script>