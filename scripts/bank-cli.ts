// scripts/bank-cli.ts
import { ethers } from "hardhat";
import { getBankContract } from "./utils";

async function main() {
  // 通过环境变量控制行为，避免 Hardhat 解析额外参数报错
  const action = process.env.ACTION || "help";   // deposit / withdraw / balance
  const amountStr = process.env.AMOUNT;         // 金额（ETH 字符串）

  const bank = await getBankContract();
  const [signer] = await ethers.getSigners();
  const user = signer.address;

  console.log("👤 当前账号:", user);

  if (action === "deposit") {
    if (!amountStr) throw new Error("请通过 AMOUNT 指定存款金额，例如 AMOUNT=0.01");
    const amount = ethers.parseEther(amountStr);

    console.log(`💰 正在存款 ${amountStr} ETH ...`);
    const tx = await bank.connect(signer).deposit({ value: amount });
    const receipt = await tx.wait();
    console.log("✅ 存款成功，tx:", receipt?.hash);
  }

  else if (action === "withdraw") {
    if (!amountStr) throw new Error("请通过 AMOUNT 指定取款金额，例如 AMOUNT=0.005");
    const amount = ethers.parseEther(amountStr);

    console.log(`🏧 正在取款 ${amountStr} ETH ...`);
    const tx = await bank.connect(signer).withdraw(amount);
    const receipt = await tx.wait();
    console.log("✅ 取款成功，tx:", receipt?.hash);
  }

  else if (action === "balance") {
    const bal = await bank.balances(user);
    console.log(`📦 当前余额: ${ethers.formatEther(bal)} ETH`);
  }

  else {
    console.log("❓ 未知 ACTION，请这样用：");
    console.log("  存款:   ACTION=deposit  AMOUNT=0.01  npx hardhat run scripts/bank-cli.ts --network localhost");
    console.log("  取款:   ACTION=withdraw AMOUNT=0.005 npx hardhat run scripts/bank-cli.ts --network localhost");
    console.log("  查余额: ACTION=balance              npx hardhat run scripts/bank-cli.ts --network localhost");
  }
}

main().catch((err) => {
  console.error("❌ CLI 运行失败:", err);
  process.exit(1);
});