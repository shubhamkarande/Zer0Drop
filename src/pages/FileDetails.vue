<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="file" class="space-y-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <router-link
            to="/dashboard"
            class="inline-flex items-center text-sm text-gray-400 hover:text-cyan-400 transition-colors mb-4"
            :class="{ 'text-gray-600 hover:text-blue-600': !store.isDarkMode }"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </router-link>
          <h1 class="text-3xl font-bold">{{ file.name }}</h1>
        </div>
        <div class="flex space-x-3 mt-4 sm:mt-0">
          <button
            @click="copyToClipboard(file.cid)"
            class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
            :class="{ 'bg-gray-200 text-gray-800 hover:bg-gray-300': !store.isDarkMode }"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Copy CID</span>
          </button>
          <button
            @click="downloadFile"
            class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 flex items-center space-x-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download</span>
          </button>
        </div>
      </div>

      <!-- File Info Card -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8" :class="{ 'bg-white/50 border-gray-200': !store.isDarkMode }">
        <div class="flex items-center space-x-6 mb-8">
          <div class="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 class="text-2xl font-bold mb-2">{{ file.name }}</h2>
            <div class="flex items-center space-x-4 text-sm text-gray-400" :class="{ 'text-gray-600': !store.isDarkMode }">
              <span>{{ formatBytes(file.size) }}</span>
              <span>•</span>
              <span>{{ file.type || 'Unknown type' }}</span>
              <span>•</span>
              <span>Uploaded {{ formatDate(file.uploadDate) }}</span>
            </div>
          </div>
        </div>

        <!-- File Details -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">IPFS Hash (CID)</label>
              <div class="bg-gray-700/50 rounded-lg p-3 font-mono text-sm break-all" :class="{ 'bg-gray-100': !store.isDarkMode }">
                {{ file.cid }}
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">IPFS Gateway URL</label>
              <div class="bg-gray-700/50 rounded-lg p-3" :class="{ 'bg-gray-100': !store.isDarkMode }">
                <a 
                  :href="gatewayUrl" 
                  target="_blank"
                  class="text-cyan-400 hover:text-cyan-300 transition-colors text-sm break-all"
                  :class="{ 'text-blue-600 hover:text-blue-500': !store.isDarkMode }"
                >
                  {{ gatewayUrl }}
                </a>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">File Size</label>
              <div class="bg-gray-700/50 rounded-lg p-3 text-sm" :class="{ 'bg-gray-100': !store.isDarkMode }">
                {{ formatBytes(file.size) }}
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Upload Date</label>
              <div class="bg-gray-700/50 rounded-lg p-3 text-sm" :class="{ 'bg-gray-100': !store.isDarkMode }">
                {{ formatDate(file.uploadDate) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sharing Options -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8" :class="{ 'bg-white/50 border-gray-200': !store.isDarkMode }">
        <h3 class="text-xl font-semibold mb-6">Share this file</h3>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium mb-2">Share CID</label>
            <div class="flex">
              <input
                :value="file.cid"
                readonly
                class="flex-1 bg-gray-700/50 border border-gray-600 rounded-l-lg px-3 py-2 text-sm font-mono"
                :class="{ 'bg-gray-100 border-gray-300': !store.isDarkMode }"
              />
              <button
                @click="copyToClipboard(file.cid)"
                class="px-4 py-2 bg-cyan-600 text-white rounded-r-lg hover:bg-cyan-500 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <p class="text-xs text-gray-400 mt-1" :class="{ 'text-gray-600': !store.isDarkMode }">
              Share this CID with anyone to give them access to the file
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Gateway Link</label>
            <div class="flex">
              <input
                :value="gatewayUrl"
                readonly
                class="flex-1 bg-gray-700/50 border border-gray-600 rounded-l-lg px-3 py-2 text-sm"
                :class="{ 'bg-gray-100 border-gray-300': !store.isDarkMode }"
              />
              <button
                @click="copyToClipboard(gatewayUrl)"
                class="px-4 py-2 bg-cyan-600 text-white rounded-r-lg hover:bg-cyan-500 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <p class="text-xs text-gray-400 mt-1" :class="{ 'text-gray-600': !store.isDarkMode }">
              Direct browser-accessible link via IPFS gateway
            </p>
          </div>
        </div>
      </div>

      <!-- Decentralization Info -->
      <div class="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl p-6">
        <div class="flex items-start space-x-4">
          <div class="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-cyan-400 mb-2">Decentralized Storage</h4>
            <p class="text-sm text-gray-300" :class="{ 'text-gray-700': !store.isDarkMode }">
              This file is stored on IPFS (InterPlanetary File System), making it accessible from anywhere in the world 
              without relying on a central server. The file is identified by its unique content hash (CID) and can be 
              retrieved from any IPFS node that has a copy.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- File Not Found -->
    <div v-else class="text-center py-16">
      <div class="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center" :class="{ 'bg-gray-200': !store.isDarkMode }">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h2 class="text-xl font-semibold mb-2">File Not Found</h2>
      <p class="text-gray-400 mb-6" :class="{ 'text-gray-600': !store.isDarkMode }">
        The requested file could not be found in your uploads.
      </p>
      <router-link
        to="/dashboard"
        class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { store } from '../store'
import { ipfsService } from '../utils/ipfs'

const props = defineProps<{
  cid: string
}>()

const file = computed(() => {
  return store.files.find(f => f.cid === props.cid)
})

const gatewayUrl = computed(() => {
  return file.value ? ipfsService.getGatewayUrl(file.value.cid) : ''
})

const downloadFile = () => {
  if (file.value) {
    ipfsService.downloadFile(file.value.cid)
  }
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // You could show a toast notification here
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
  }
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>