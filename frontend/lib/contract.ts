// QuikPay Contract Configuration
import quikpayAbi from './abi/quikpay.json';
import type { Abi } from 'viem';

// QuikPay Contract address - Deployed on Push Chain Testnet
export const QUIKPAY_CONTRACT_ADDRESS = '0x9A2478962cC59f0A606D536937883cE5845eA400' as const;

export const QUIKPAY_ABI = quikpayAbi as Abi;

// Network Configuration
export const PUSH_TESTNET = {
  id: 42101,
  name: 'Push Chain Donut Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'PC',
    symbol: 'PC',
  },
  rpcUrls: {
    public: { http: [
      // Prefer env-provided RPC to avoid public rate limits
      (process.env.NEXT_PUBLIC_PUSH_TESTNET_RPC_URL as string) || 'https://evm.rpc-testnet-donut-node1.push.org/'
    ] },
    default: { http: [
      (process.env.NEXT_PUBLIC_PUSH_TESTNET_RPC_URL as string) || 'https://evm.rpc-testnet-donut-node1.push.org/'
    ] },
  },
  blockExplorers: {
    default: { name: 'Push Scan', url: 'https://donut.push.network' },
  },
} as const;

// ERC20 Token addresses - Deployed on Push Chain Testnet
export const TOKENS = {
  USDC: '0x063Ac592F8cd80fa97c9D9B969C86afe611aB39B', // MockUSDC
  USDT: '0x8D285c197E92645C2fE5bBe50cE6DC5580914284', // MockUSDT
  WETH: '0x1B2ffe2Cf88A0749D858e4e6d0307C94EA862A28', // MockWETH
} as const;
