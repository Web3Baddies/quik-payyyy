'use client'

import { 
  PushUniversalWalletProvider, 
  PushUI 
} from '@pushchain/ui-kit'
import { ReactNode } from 'react'

// App metadata for Push Universal Wallet
const appMetadata = {
  logoUrl: '/logo.png', // Update with your actual logo
  title: 'QuikPay',
  description: 'QR-based payments on Push Chain with gasless ERC-20 support',
}

// Wallet configuration
const walletConfig = {
  network: PushUI.CONSTANTS.PUSH_NETWORK.TESTNET,
  login: {
    email: true,
    google: true,
    wallet: {
      enabled: true,
    },
    appPreview: true,
  },
  modal: {
    loginLayout: PushUI.CONSTANTS.LOGIN.LAYOUT.SPLIT,
    connectedLayout: PushUI.CONSTANTS.CONNECTED.LAYOUT.HOVER,
    appPreview: true,
  },
}

export function PushWalletProvider({ children }: { children: ReactNode }) {
  return (
    <PushUniversalWalletProvider config={walletConfig} app={appMetadata}>
      {children}
    </PushUniversalWalletProvider>
  )
}
