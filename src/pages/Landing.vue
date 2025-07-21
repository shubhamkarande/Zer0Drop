<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
      <div class="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
      <div class="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
    </div>

    <div class="relative z-10 flex flex-col min-h-screen">
      <!-- Header -->
      <header class="p-6">
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center">
            <span class="text-white font-bold">Z</span>
          </div>
          <span class="text-2xl font-bold text-white">Zer0Drop</span>
        </div>
      </header>

      <!-- Main content -->
      <main class="flex-1 flex items-center justify-center px-6">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span class="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Censorship-Free
            </span>
            <br />
            File Exchange
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Share files on the decentralized web. Your data, your control. 
            No censorship, no central authority, no limits.
          </p>

          <!-- Benefits -->
          <div class="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div class="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">Secure & Private</h3>
              <p class="text-gray-400 text-sm">End-to-end encryption with blockchain-based authentication</p>
            </div>

            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
              <p class="text-gray-400 text-sm">IPFS-powered distribution for instant global access</p>
            </div>

            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div class="w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">Decentralized</h3>
              <p class="text-gray-400 text-sm">No single point of failure or control</p>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <router-link 
              to="/upload" 
              class="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Upload File
            </router-link>
            
            <router-link 
              to="/connect" 
              class="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              Connect Wallet
            </router-link>
          </div>

          <!-- Stats -->
          <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-cyan-400">∞</div>
              <div class="text-sm text-gray-400">Files Shared</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-purple-400">24/7</div>
              <div class="text-sm text-gray-400">Uptime</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-green-400">0%</div>
              <div class="text-sm text-gray-400">Censorship</div>
            </div>
            <div class="text-center">
              <div class="text-2xl md:text-3xl font-bold text-pink-400">100%</div>
              <div class="text-sm text-gray-400">Decentralized</div>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="p-6 text-center text-gray-400 text-sm">
        <p>&copy; 2025 Zer0Drop. Powered by IPFS & Web3.</p>
      </footer>
    </div>
  </div>
</template>