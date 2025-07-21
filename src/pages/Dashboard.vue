<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-bold mb-2">Dashboard</h1>
          <p class="text-gray-400" :class="{ 'text-gray-600': !store.isDarkMode }">
            Manage your decentralized files
          </p>
        </div>
        <router-link
          to="/upload"
          class="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Upload New File
        </router-link>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700" :class="{ 'bg-white/50 border-gray-200': !store.isDarkMode }">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold">{{ store.files.length }}</p>
            <p class="text-sm text-gray-400" :class="{ 'text-gray-600': !store.isDarkMode }">Total Files</p>
          </div>
        </div>
      </div>

      <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700" :class="{ 'bg-white/50 border-gray-200': !store.isDarkMode }">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-600 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold">{{ formatBytes(totalSize) }}</p>
            <p class="text-sm text-gray-400" :class="{ 'text-gray-600': !store.isDarkMode }">Total Size</p>
          </div>
        </div>
      </div>

      <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700" :class="{ 'bg-white/50 border-gray-200': !store.isDarkMode }">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-600 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold">100%</p>
            <p class="text-sm text-gray-400" :class="{ 'text-gray-600': !store.isDarkMode }">Decentralized</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Files List -->
    <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700" :class="{ 'bg-white/50 border-gray-200': !store.isDarkMode }">
      <div class="p-6 border-b border-gray-700" :class="{ 'border-gray-200': !store.isDarkMode }">
        <h2 class="text-xl font-semibold">Your Files</h2>
      </div>

      <div v-if="store.files.length === 0" class="p-12 text-center">
        <div class="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center" :class="{ 'bg-gray-200': !store.isDarkMode }">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium mb-2">No files uploaded yet</h3>
        <p class="text-gray-400 mb-6" :class="{ 'text-gray-600': !store.isDarkMode }">
          Upload your first file to get started with decentralized sharing
        </p>
        <router-link
          to="/upload"
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Upload File
        </router-link>
      </div>

      <div v-else class="divide-y divide-gray-700" :class="{ 'divide-gray-200': !store.isDarkMode }">
        <div
          v-for="file in store.files"
          :key="file.id"
          class="p-6 hover:bg-gray-700/30 transition-colors cursor-pointer"
          :class="{ 'hover:bg-gray-50': !store.isDarkMode }"
          @click="$router.push(`/file/${file.cid}`)"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4 flex-1 min-w-0">
              <div class="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium truncate">{{ file.name }}</p>
                <div class="flex items-center space-x-4 mt-1">
                  <p class="text-xs text-gray-400 font-mono" :class="{ 'text-gray-600': !store.isDarkMode }">
                    {{ file.cid.slice(0, 16) }}...
                  </p>
                  <p class="text-xs text-gray-400" :class="{ 'text-gray-600': !store.isDarkMode }">
                    {{ formatBytes(file.size) }}
                  </p>
                  <p class="text-xs text-gray-400" :class="{ 'text-gray-600': !store.isDarkMode }">
                    {{ formatDate(file.uploadDate) }}
                  </p>
                </div>
              </div>
            </div>
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { store } from '../store'

const totalSize = computed(() => {
  return store.files.reduce((sum, file) => sum + file.size, 0)
})

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>