<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Upload File</h1>
      <p class="text-gray-400" :class="{ 'text-gray-600': !store.isDarkMode }">
        Share your files on the decentralized web
      </p>
    </div>

    <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8" :class="{ 'bg-white/50 border-gray-200': !store.isDarkMode }">
      <!-- Upload Area -->
      <div
        @drop="handleDrop"
        @dragover="handleDragOver"
        @dragenter="handleDragEnter"
        @dragleave="handleDragLeave"
        @click="triggerFileInput"
        class="relative border-2 border-dashed border-gray-600 rounded-xl p-12 text-center cursor-pointer transition-all duration-300 hover:border-cyan-400"
        :class="{
          'border-cyan-400 bg-cyan-400/5': isDragging,
          'border-gray-300 hover:border-blue-400': !store.isDarkMode && !isDragging,
          'border-blue-400 bg-blue-400/5': !store.isDarkMode && isDragging
        }"
      >
        <input
          ref="fileInput"
          type="file"
          class="hidden"
          @change="handleFileSelect"
          multiple
        />

        <div v-if="!selectedFiles.length">
          <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">
            {{ isDragging ? 'Drop your files here' : 'Choose files to upload' }}
          </h3>
          <p class="text-gray-400 mb-4" :class="{ 'text-gray-600': !store.isDarkMode }">
            Drag and drop files here, or click to browse
          </p>
          <p class="text-sm text-gray-500" :class="{ 'text-gray-500': !store.isDarkMode }">
            Maximum file size: 100MB
          </p>
        </div>

        <!-- Selected Files -->
        <div v-if="selectedFiles.length" class="space-y-3">
          <h3 class="text-lg font-semibold mb-4">Selected Files</h3>
          <div
            v-for="(file, index) in selectedFiles"
            :key="index"
            class="flex items-center justify-between bg-gray-700/30 rounded-lg p-3"
            :class="{ 'bg-gray-100': !store.isDarkMode }"
          >
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium">{{ file.name }}</p>
                <p class="text-xs text-gray-400" :class="{ 'text-gray-600': !store.isDarkMode }">
                  {{ formatBytes(file.size) }}
                </p>
              </div>
            </div>
            <button
              @click.stop="removeFile(index)"
              class="text-gray-400 hover:text-red-400 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Upload Button -->
      <div v-if="selectedFiles.length" class="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          @click="uploadFiles"
          :disabled="isUploading"
          class="flex-1 py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
        >
          <div v-if="isUploading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span>{{ isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''}` }}</span>
        </button>
        
        <button
          @click="clearFiles"
          :disabled="isUploading"
          class="px-6 py-4 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :class="{ 'bg-gray-200 text-gray-800 hover:bg-gray-300': !store.isDarkMode }"
        >
          Clear
        </button>
      </div>

      <!-- Upload Progress -->
      <div v-if="isUploading" class="mt-6">
        <div class="bg-gray-700 rounded-full h-2" :class="{ 'bg-gray-200': !store.isDarkMode }">
          <div 
            class="bg-gradient-to-r from-cyan-400 to-blue-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${uploadProgress}%` }"
          ></div>
        </div>
        <p class="text-sm text-gray-400 mt-2" :class="{ 'text-gray-600': !store.isDarkMode }">
          Uploading to IPFS... {{ uploadProgress }}%
        </p>
      </div>

      <!-- Success Messages -->
      <div v-if="uploadedFiles.length" class="mt-6 space-y-3">
        <h3 class="text-lg font-semibold text-green-400">Upload Complete!</h3>
        <div
          v-for="file in uploadedFiles"
          :key="file.cid"
          class="bg-green-500/10 border border-green-500/20 rounded-lg p-4"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium text-green-400">{{ file.name }}</p>
              <p class="text-sm text-gray-400 font-mono mt-1" :class="{ 'text-gray-600': !store.isDarkMode }">
                CID: {{ file.cid }}
              </p>
            </div>
            <div class="flex space-x-2">
              <button
                @click="copyToClipboard(file.cid)"
                class="p-2 text-green-400 hover:text-green-300 transition-colors"
                title="Copy CID"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <router-link
                :to="`/file/${file.cid}`"
                class="p-2 text-green-400 hover:text-green-300 transition-colors"
                title="View Details"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
        <div class="flex items-start space-x-3">
          <svg class="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p class="text-red-400 font-medium">Upload Failed</p>
            <p class="text-sm text-gray-400 mt-1" :class="{ 'text-gray-600': !store.isDarkMode }">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { store, actions } from '../store'
import { ipfsService } from '../utils/ipfs'
import type { FileEntry } from '../store'

const fileInput = ref<HTMLInputElement>()
const selectedFiles = ref<File[]>([])
const isDragging = ref(false)
const isUploading = ref(false)
const uploadProgress = ref(0)
const uploadedFiles = ref<FileEntry[]>([])
const error = ref('')

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
}

const handleDragEnter = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault()
  if (!e.relatedTarget || !(e.currentTarget as Element).contains(e.relatedTarget as Node)) {
    isDragging.value = false
  }
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  
  if (e.dataTransfer?.files) {
    const newFiles = Array.from(e.dataTransfer.files)
    selectedFiles.value.push(...newFiles)
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    const newFiles = Array.from(target.files)
    selectedFiles.value.push(...newFiles)
  }
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

const clearFiles = () => {
  selectedFiles.value = []
  uploadedFiles.value = []
  error.value = ''
}

const uploadFiles = async () => {
  if (!selectedFiles.value.length) return

  isUploading.value = true
  uploadProgress.value = 0
  error.value = ''
  uploadedFiles.value = []

  try {
    for (let i = 0; i < selectedFiles.value.length; i++) {
      const file = selectedFiles.value[i]
      
      // Check file size (100MB limit)
      if (file.size > 100 * 1024 * 1024) {
        throw new Error(`File "${file.name}" is too large. Maximum size is 100MB.`)
      }

      uploadProgress.value = Math.round((i / selectedFiles.value.length) * 100)

      const cid = await ipfsService.uploadFile(file)
      
      const fileEntry: FileEntry = {
        id: Math.random().toString(36).substring(2),
        name: file.name,
        cid,
        uploadDate: new Date(),
        size: file.size,
        type: file.type
      }

      actions.addFile(fileEntry)
      uploadedFiles.value.push(fileEntry)
    }

    uploadProgress.value = 100
    selectedFiles.value = []
  } catch (err: any) {
    error.value = err.message
  } finally {
    isUploading.value = false
    uploadProgress.value = 0
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
</script>