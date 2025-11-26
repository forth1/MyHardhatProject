import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {

    // 1. 读取 deployments.json
    const depPath = path.join(__dirname, "..", "deployments.json");
    if (!fs.existsSync(depPath)) {
        throw new Error("❌ deployments.json 不存在，请先运行 deploy-and-save.ts");
    }
    const dep = JSON.parse(fs.readFileSync(depPath, "utf-8"));
    const address = dep.Lesson8_EventsBank;
    console.log("📌 使用合约地址:", address);

    // 2. 获取 signer
    const [user] = await ethers.getSigners();
    console.log("👤 当前使用账号:", user.address);

    // 3. 获取合约实例
    const bank = await ethers.getContractAt("Lesson8_EventsBank", address);

    // 4. 取款
    const tx = await bank.withdraw(ethers.parseEther("0.001"));
    console.log("🏧 Withdraw Tx Hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("📦 区块确认:", receipt.blockNumber);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});