'use client'

import { useEffect, useState } from 'react'
import { 
  PushUniversalAccountButton, 
  usePushWalletContext,
  usePushChainClient,
  PushUI 
} from '@pushchain/ui-kit'
import { useAccount, useChainId } from 'wagmi'
import { PUSH_TESTNET } from '@/lib/contract'

export function PushWalletButton() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const { connectionStatus } = usePushWalletContext()
  const { pushChainClient } = usePushChainClient()
  const { address: wagmiAddress } = useAccount()
  const chainId = useChainId()

  // Avoid SSR/client mismatch
  if (!mounted) {
    return <div className="h-9" />
  }

  const networkName = chainId === PUSH_TESTNET.id
    ? PUSH_TESTNET.name
    : chainId
      ? `Chain ${chainId}`
      : 'Unknown'

  return (
    <div className="flex items-center gap-2">
      {connectionStatus === PushUI.CONSTANTS.CONNECTION.STATUS.CONNECTED && (
        <>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            {networkName}
          </div>
          {pushChainClient?.universal.account && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {`${pushChainClient.universal.account.slice(0, 6)}...${pushChainClient.universal.account.slice(-4)}`}
            </div>
          )}
        </>
      )}
      <PushUniversalAccountButton />
    </div>
  )
}
