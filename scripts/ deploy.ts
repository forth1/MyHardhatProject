import { ethers } from "hardhat";

async function main() {
  const Bank = await ethers.getContractFactory("Bank");
  const bank = await Bank.deploy();

  await bank.deployed();

  console.log("Bank.sol 部署成功！");
  console.log("合约地址：", bank.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});