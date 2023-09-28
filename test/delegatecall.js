const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Delegate Call", async () => {
  it("Should change the owner of the Contract", async () => {
    const helperContract = await ethers.deployContract("Helper");
    await helperContract.waitForDeployment();

    const goodContract = await ethers.deployContract("Good", [
      helperContract.target,
    ]);
    await goodContract.waitForDeployment();

    const attackContract = await ethers.deployContract("Attack", [
      goodContract.target,
    ]);
    await attackContract.waitForDeployment();

    const txn = await attackContract.attack();
    await txn.wait();

    expect(await goodContract.owner()).to.equal(attackContract.target);
  });
});
