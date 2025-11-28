// hardhat.config.ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

// 从 .env 里读变量
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.20", // 如果你的 Bank.sol 用的是 0.8.28，就改成 "0.8.28"
  networks: {
    // 本地 hardhat 网络（npx hardhat node）
    hardhat: {},

    // localhost（你的 React DApp 现在用的就是 127.0.0.1:8545）
    localhost: {
      url: "http://127.0.0.1:8545/",
    },

    // ⭐ Sepolia 测试网
    sepolia: {
      url: SEPOLIA_RPC_URL,          // 来自 .env
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [], // 用这个私钥部署
    },
  },
};

export default config;