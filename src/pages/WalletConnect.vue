<template>
  <div class="min-h-screen flex items-center justify-center p-6">
    <div class="max-w-md w-full">
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700" :class="{ 'bg-white/50 border-gray-200': !store.isDarkMode }">
        <div class="text-center mb-8">
          <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold mb-2">Connect Your Wallet</h1>
          <p class="text-gray-400" :class="{ 'text-gray-600': !store.isDarkMode }">
            Connect your Ethereum wallet to start sharing files on the decentralized web
          </p>
        </div>

        <div v-if="!web3Service.isWalletInstalled()" class="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <div class="flex items-start space-x-3">
            <svg class="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <p class="text-yellow-400 font-medium">MetaMask Not Detected</p>
              <p class="text-sm text-gray-400 mt-1" :class="{ 'text-gray-600': !store.isDarkMode }">
                Please install MetaMask to continue
              </p>
              <a 
                href="https://metamask.io/download/" 
                target="_blank"
                class="inline-block mt-2 text-sm text-cyan-400 hover:text-cyan-300 underline"
              >
                Download MetaMask
              </a>
            </div>
          </div>
        </div>

        <button
          @click="connectWallet"
          :disabled="isConnecting || !web3Service.isWalletInstalled()"
          class="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
        >
          <svg v-if="!isConnecting" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div v-if="isConnecting" class="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>{{ isConnecting ? 'Connecting...' : 'Connect MetaMask' }}</span>
        </button>

        <div v-if="error" class="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div class="flex items-start space-x-3">
            <svg class="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p class="text-red-400 font-medium">Connection Failed</p>
              <p class="text-sm text-gray-400 mt-1" :class="{ 'text-gray-600': !store.isDarkMode }">{{ error }}</p>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-gray-700" :class="{ 'border-gray-200': !store.isDarkMode }">
          <h3 class="font-semibold mb-3">Why connect a wallet?</h3>
          <ul class="space-y-2 text-sm text-gray-400" :class="{ 'text-gray-600': !store.isDarkMode }">
            <li class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Secure authentication without passwords</span>
            </li>
            <li class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Decentralized file ownership</span>
            </li>
            <li class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Access your files anywhere</span>
            </li>
          </ul>
        </div>

        <div class="mt-6 text-center">
          <router-link 
            to="/" 
            class="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            :class="{ 'text-gray-600 hover:text-blue-600': !store.isDarkMode }"
          >
            ← Back to home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { web3Service } from '../utils/web3'
import { store, actions } from '../store'

const router = useRouter()
const isConnecting = ref(false)
const error = ref('')

const connectWallet = async () => {
  if (!web3Service.isWalletInstalled()) {
    error.value = 'MetaMask is not installed'
    return
  }

  isConnecting.value = true
  error.value = ''

  try {
    const address = await web3Service.connectWallet()
    actions.connectWallet(address)
    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.message
  } finally {
    isConnecting.value = false
  }
}
</script>