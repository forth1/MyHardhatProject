// scripts/deploy.ts
import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  console.log("🚀 正在部署 Lesson8_EventsBank ...");

  const Bank = await ethers.getContractFactory("Lesson8_EventsBank");
  const bank = await Bank.deploy();
  await bank.waitForDeployment();

  const address = await bank.getAddress();
  console.log("✅ 部署成功，合约地址:", address);

  // 写入 deployments.json
  const savePath = path.join(__dirname, "..", "deployments.json");
  const data = {
    Lesson8_EventsBank: address,
    network: "localhost",
    updatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(savePath, JSON.stringify(data, null, 2));
  console.log("📁 地址已写入:", savePath);
}

main().catch((err) => {
  console.error("❌ 部署脚本出错:", err);
  process.exit(1);
});