# QuikPay – Push Chain Payment dApp

Create and receive QR-based payments on Push Chain Testnet with gasless ERC‑20 support.

## Requirements
- Node 18+
- WalletConnect Project ID
- A funded sponsor private key for the relayer (used server-side for ERC‑20 Permit flow)

## Setup
1) Frontend env: `frontend/.env.local`
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   RPC_URL=https://evm.rpc-testnet-donut-node1.push.org/
   SPONSOR_PK=0xyour_private_key_for_sponsoring_gas

2) Contracts env: contract/.env
   PRIVATE_KEY=deployer_key_without_0x
   PUSH_TESTNET_RPC_URL=https://evm.rpc-testnet-donut-node1.push.org/

## Run
- Web (Next.js):
  cd frontend
  npm run dev

- Contracts (Hardhat):
  cd contract
  npm run build
  npm run test

## Contract (Push Chain Testnet)
- ChainId: 42101
- Explorer: https://donut.push.network
- QuikPay: TBD (deploy after migration)
- Tokens:
  USDC: TBD (deploy mock tokens on Push Chain)
  USDT: TBD (deploy mock tokens on Push Chain)
  WETH: TBD (deploy mock tokens on Push Chain)

## Notes
- Gasless ERC‑20 uses EIP‑2612 Permit + a server relayer at `frontend/app/api/gasless-payment/route.ts` (sponsor pays gas).
- Bill expiration is handled manually through `expireOldBills()` function - can be called by anyone to clean up expired bills.
- Network config and addresses: `frontend/lib/contract.ts`.

## Quick Guide 
1) Open merchant dashboard: run web app, go to `/merchant`.
2) Create request: choose token (USDC/USDT/WETH), set optional amount/description, generate QR/link.
3) Share: customer scans QR or opens the link (it encodes receiver, token, chainId, contract, and signature).
4) Pay: client builds an EIP‑2612 Permit; the server relayer calls `payDynamicERC20WithPermit` and pays the gas.
5) Confirm: view tx on Push Chain explorer; merchant history auto-updates in `/merchant`.

## Troubleshooting
- Ensure `SPONSOR_PK` is set and funded on Push Chain Testnet; the relayer will pay gas for ERC‑20 permit payments.
- Confirm `RPC_URL` is reachable and points to Push Chain Testnet.
- Ensure `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set for wallet connections.
- Use Node 18+; reinstall deps if build fails.
- Bill expiration scripts: `contract/scripts/check-expired-bills.js`, `expire-bills.js`.
- Get testnet PC tokens from the faucet: https://faucet.push.org
