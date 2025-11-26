// scripts/utils.ts
import fs from "fs";
import path from "path";
import { ethers } from "hardhat";

// 读取 deployments.json
export function loadDeployment() {
  const file = path.join(__dirname, "..", "deployments.json");
  if (!fs.existsSync(file)) {
    throw new Error("deployments.json 不存在，请先运行部署脚本（npx hardhat run scripts/deploy.ts --network localhost）");
  }
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

// 获取 Lesson8_EventsBank 合约实例
export async function getBankContract() {
  const deployment = loadDeployment();
  const address = deployment.Lesson8_EventsBank;

  const Bank = await ethers.getContractFactory("Lesson8_EventsBank");
  return Bank.attach(address);
}