import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import { Web3Provider } from "@/lib/web3-provider"
import { PushWalletProvider } from "@/lib/push-wallet-provider"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "QuikPay - Gasless Crypto Payments on Push Chain",
  description: "Seamless crypto payments on Push Chain Testnet with gasless transactions and universal wallet support",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <Web3Provider>
          <PushWalletProvider>
            {children}
          </PushWalletProvider>
        </Web3Provider>
      </body>
    </html>
  )
}
