<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Settings</h1>
      <p class="text-gray-400" :class="{ 'text-gray-600': !store.isDarkMode }">
        Manage your account and preferences
      </p>
    </div>

    <div class="space-y-6">
      <!-- Wallet Section -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8" :class="{ 'bg-white/50 border-gray-200': !store.isDarkMode }">
        <h2 class="text-xl font-semibold mb-6">Wallet Connection</h2>
        
        <div class="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg" :class="{ 'bg-gray-100': !store.isDarkMode }">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p class="font-medium">Connected Wallet</p>
              <p class="text-sm text-gray-400 font-mono" :class="{ 'text-gray-600': !store.isDarkMode }">
                {{ store.walletAddress }}
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-sm text-green-400">Connected</span>
          </div>
        </div>

        <button
          @click="disconnectWallet"
          class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Disconnect Wallet
        </button>
      </div>

      <!-- Appearance Section -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8" :class="{ 'bg-white/50 border-gray-200': !store.isDarkMode }">
        <h2 class="text-xl font-semibold mb-6">Appearance</h2>
        
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium">Theme</p>
            <p class="text-sm text-gray-400" :class="{ 'text-gray-600': !store.isDarkMode }">
              Choose your preferred color scheme
            </p>
          </div>
          <button
            @click="actions.toggleDarkMode"
            class="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
            :class="{ 'bg-gray-100 hover:bg-gray-200': !store.isDarkMode }"
          >
            <svg v-if="store.isDarkMode" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <span>{{ store.isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
          </button>
        </div>
      </div>

      <!-- Storage Statistics -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8" :class="{ 'bg-white/50 border-gray-200': !store.isDarkMode }">
        <h2 class="text-xl font-semibold mb-6">Storage Statistics</h2>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p class="text-2xl font-bold">{{ store.files.length }}</p>
            <p class="text-sm text-gray-400" :class="{ 'text-gray-600': !store.isDarkMode }">Files Uploaded</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <p class="text-2xl font-bold">{{ formatBytes(totalSize) }}</p>
            <p class="text-sm text-gray-400" :class="{ 'text-gray-600': !store.isDarkMode }">Total Storage</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-400 to-cyan-600 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p class="text-2xl font-bold">∞</p>
            <p class="text-sm text-gray-400" :class="{ 'text-gray-600': !store.isDarkMode }">Availability</p>
          </div>
        </div>
      </div>

      <!-- About Section -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8" :class="{ 'bg-white/50 border-gray-200': !store.isDarkMode }">
        <h2 class="text-xl font-semibold mb-6">About Zer0Drop</h2>
        
        <div class="space-y-4 text-sm text-gray-400" :class="{ 'text-gray-600': !store.isDarkMode }">
          <p>
            Zer0Drop is a decentralized file-sharing platform built on IPFS (InterPlanetary File System). 
            Your files are stored across a distributed network, ensuring censorship resistance and global accessibility.
          </p>
          <p>
            By connecting your Ethereum wallet, you maintain full ownership and control over your data. 
            No central authority can restrict or remove your files.
          </p>
          
          <div class="flex items-center space-x-4 pt-4">
            <a href="https://ipfs.io" target="_blank" class="text-cyan-400 hover:text-cyan-300 transition-colors" :class="{ 'text-blue-600 hover:text-blue-500': !store.isDarkMode }">
              Learn about IPFS
            </a>
            <span class="text-gray-600">•</span>
            <a href="https://ethereum.org" target="_blank" class="text-cyan-400 hover:text-cyan-300 transition-colors" :class="{ 'text-blue-600 hover:text-blue-500': !store.isDarkMode }">
              About Ethereum
            </a>
          </div>
        </div>
      </div>

      <!-- Danger Zone -->
      <div class="bg-red-500/10 border border-red-500/20 rounded-xl p-8">
        <h2 class="text-xl font-semibold mb-4 text-red-400">Danger Zone</h2>
        <p class="text-sm text-gray-400 mb-6" :class="{ 'text-gray-600': !store.isDarkMode }">
          These actions are permanent and cannot be undone.
        </p>
        
        <button
          @click="clearAllData"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Clear All Local Data
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { store, actions } from '../store'

const router = useRouter()

const totalSize = computed(() => {
  return store.files.reduce((sum, file) => sum + file.size, 0)
})

const disconnectWallet = () => {
  actions.disconnectWallet()
  router.push('/connect')
}

const clearAllData = () => {
  if (confirm('Are you sure you want to clear all local data? This action cannot be undone.')) {
    localStorage.clear()
    store.files.splice(0)
    actions.disconnectWallet()
    router.push('/')
  }
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>