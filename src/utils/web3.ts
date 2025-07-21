import { ethers } from 'ethers'

export class Web3Service {
  private provider: ethers.BrowserProvider | null = null

  async connectWallet(): Promise<string> {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed!')
    }

    try {
      this.provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await this.provider.send('eth_requestAccounts', [])
      return accounts[0]
    } catch (error: any) {
      throw new Error(`Failed to connect wallet: ${error.message}`)
    }
  }

  async getAccount(): Promise<string | null> {
    if (!this.provider) return null
    
    try {
      const accounts = await this.provider.listAccounts()
      return accounts.length > 0 ? accounts[0].address : null
    } catch {
      return null
    }
  }

  isWalletInstalled(): boolean {
    return typeof window.ethereum !== 'undefined'
  }
}

export const web3Service = new Web3Service()