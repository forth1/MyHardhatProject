import { ethers } from "hardhat";
import { expect } from "chai";

describe("Lesson8_EventsBank", function () {

  let bank: any;
  let owner: any;
  let user: any;

  beforeEach(async () => {
    const Bank = await ethers.getContractFactory("Lesson8_EventsBank");
    bank = await Bank.deploy();
    await bank.waitForDeployment();

    [owner, user] = await ethers.getSigners();
  });

  it("存款 deposit 应该正常增加余额并触发事件", async () => {
    const amount = ethers.parseEther("0.001");

    await expect(
      bank.connect(owner).deposit({ value: amount })
    )
      .to.emit(bank, "Deposit")
      .withArgs(owner.address, amount);

    const bal = await bank.balances(owner.address);
    expect(bal).to.equal(amount);
  });

  it("存 0 ETH 应该 revert", async () => {
    await expect(
      bank.deposit({ value: 0 })
    ).to.be.revertedWith("no zero value");
  });

  it("取款应成功并触发事件", async () => {
    const amount = ethers.parseEther("0.002");
    await bank.deposit({ value: amount });

    await expect(
      bank.withdraw(ethers.parseEther("0.001"))
    )
      .to.emit(bank, "Withdraw")
      .withArgs(owner.address, ethers.parseEther("0.001"));

    const bal = await bank.balances(owner.address);
    expect(bal).to.equal(ethers.parseEther("0.001"));
  });

  it("余额不足取款应该 revert", async () => {
    await expect(
      bank.withdraw(ethers.parseEther("1"))
    ).to.be.revertedWith("not enough");
  });

});