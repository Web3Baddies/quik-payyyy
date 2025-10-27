require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { PRIVATE_KEY } = process.env;
// Normalize private key to ensure it is 0x-prefixed if provided without
const PK = PRIVATE_KEY
  ? (PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`)
  : undefined;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  // Disable Sourcify messages during verification (optional, reduces noise)
  sourcify: {
    enabled: false,
  },
  networks: {
    pushTestnet: {
      url: "https://evm.rpc-testnet-donut-node1.push.org/",
      chainId: 42101,
      accounts: PK ? [PK] : [],
      gasPrice: "auto",
      gas: "auto",
    },
  
  },
  etherscan: {
    // Provide per-network keys (Blockscout usually ignores the key, but hardhat-verify expects non-empty mapping)
    apiKey: {
      pushTestnet: process.env.ETHERSCAN_API_KEY || "blockscout",
    },
    customChains: [
      {
        network: "pushTestnet",
        chainId: 42101,
        urls: {
          apiURL: "https://donut.push.network/api",
          browserURL: "https://donut.push.network",
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
}; 