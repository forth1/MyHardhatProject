// scripts/deposit-withdraw.ts
import { ethers } from "hardhat";

async function main() {
  // 1. 取出第一个账号（默认部署者）
  const [deployer] = await ethers.getSigners();
  console.log("使用账号：", deployer.address);

  // ================= 两种用法，选一种 =================

  // ✅ 方式 A：脚本里“重新部署”一次，然后再调用
  const BankFactory = await ethers.getContractFactory("Lesson8_EventsBank");
  const bank = await BankFactory.deploy();
  await bank.waitForDeployment();

  const addr = await bank.getAddress();
  console.log("Lesson8_EventsBank 新部署在：", addr);

  // 2. 调用 deposit，转 0.01 ETH 进去
  const depositTx = await bank.deposit({
    value: ethers.parseEther("0.01"), // 0.01 ETH
  });
  await depositTx.wait();
  console.log("✅ deposit 成功，存入 0.01 ETH");

  // 3. 调用 withdraw，取出 0.005 ETH
  const withdrawTx = await bank.withdraw(ethers.parseEther("0.005"));
  await withdrawTx.wait();
  console.log("✅ withdraw 成功，取出 0.005 ETH");

  const balance = await bank.balances(deployer.address);
  console.log("当前合约里记录的余额：", balance.toString(), "wei");

  // --------------------------------------------------
  // ✅ 方式 B：如果你已经部署过合约，只想“用地址”调用：
  //
  // const bankAddress = "这里换成你部署出来的地址";
  // const bank = await ethers.getContractAt(
  //   "Lesson8_EventsBank",
  //   bankAddress,
  //   deployer
  // );
  //
  // 然后下面的 deposit / withdraw 调用跟上面一样就行
  // --------------------------------------------------
}

// 标准的 main() 错误处理
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});