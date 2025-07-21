import { reactive } from 'vue'

export interface FileEntry {
  id: string
  name: string
  cid: string
  uploadDate: Date
  size: number
  type: string
}

interface AppState {
  isWalletConnected: boolean
  walletAddress: string
  files: FileEntry[]
  isDarkMode: boolean
}

export const store = reactive<AppState>({
  isWalletConnected: false,
  walletAddress: '',
  files: [],
  isDarkMode: true
})

export const actions = {
  connectWallet(address: string) {
    store.isWalletConnected = true
    store.walletAddress = address
    localStorage.setItem('walletAddress', address)
  },
  
  disconnectWallet() {
    store.isWalletConnected = false
    store.walletAddress = ''
    localStorage.removeItem('walletAddress')
  },
  
  addFile(file: FileEntry) {
    store.files.unshift(file)
    localStorage.setItem('files', JSON.stringify(store.files))
  },
  
  loadFiles() {
    const savedFiles = localStorage.getItem('files')
    if (savedFiles) {
      store.files = JSON.parse(savedFiles).map((f: any) => ({
        ...f,
        uploadDate: new Date(f.uploadDate)
      }))
    }
  },
  
  toggleDarkMode() {
    store.isDarkMode = !store.isDarkMode
    localStorage.setItem('darkMode', store.isDarkMode.toString())
    if (store.isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },
  
  initializeApp() {
    // Load saved wallet
    const savedWallet = localStorage.getItem('walletAddress')
    if (savedWallet) {
      store.isWalletConnected = true
      store.walletAddress = savedWallet
    }
    
    // Load saved files
    this.loadFiles()
    
    // Load theme preference
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme !== null) {
      store.isDarkMode = savedTheme === 'true'
    }
    
    if (store.isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }
}