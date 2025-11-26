import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lesson8_EventsBank - Event Tests", () => {

    it("should emit Deposit event", async () => {
        const Bank = await ethers.getContractFactory("Lesson8_EventsBank");
        const bank = await Bank.deploy();
        await bank.waitForDeployment();

        const [user] = await ethers.getSigners();

        const amount = ethers.parseEther("0.01");

        await expect(
            bank.connect(user).deposit({ value: amount })
        )
        .to.emit(bank, "Deposit")
        .withArgs(user.address, amount);
    });


    it("should emit Withdraw event", async () => {
        const Bank = await ethers.getContractFactory("Lesson8_EventsBank");
        const bank = await Bank.deploy();
        await bank.waitForDeployment();

        const [user] = await ethers.getSigners();

        const amount = ethers.parseEther("0.02");

        // 需要先存一点
        await bank.connect(user).deposit({ value: amount });

        // 再测试 withdraw 事件
        await expect(
            bank.connect(user).withdraw(amount)
        )
        .to.emit(bank, "Withdraw")
        .withArgs(user.address, amount);
    });

});