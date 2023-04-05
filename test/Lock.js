const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("MEMEKONG", function () {
  
  async function deploy() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory("MEMEKONG");
    const lock = await Lock.deploy(1000);

    return { lock, unlockTime, lockedAmount, owner, otherAccount };
  };

  describe("Deployment", function () {
    it("should only allow the owner to pause and unpause the contract", async () => {
      const { memeKong, owner, otherAccount } = await loadFixture(deploy);

      // Try to pause the contract with a non-owner account
      await expect(memeKong.connect(otherAccount).pause())
        .to.be.revertedWith("Ownable: caller is not the owner");
    
      // Pause the contract with the owner account
      await memeKong.pause();
      expect(await memeKong.paused()).to.be.true;
    
      // Try to unpause the contract with a non-owner account
      await expect(memeKong.connect(otherAccount).unpause())
        .to.be.revertedWith("Ownable: caller is not the owner");
    
      // Unpause the contract with the owner account
      await memeKong.unpause();
      expect(await memeKong.paused()).to.be.false;
    });

    // it("should only allow the owner to set the token URI", async () => {
    //   const { memeKong, owner, otherAccount } = await loadFixture(deploy);

    //   const newTokenURI = "https://newuri.com/token123";
    
    //   // Try to set the token URI with a non-owner account
    //   await expect(memeKong.connect(otherAccount).setTokenURI(0, newTokenURI))
    //     .to.be.revertedWith("Ownable: caller is not the owner");
    
    //   // Set the token URI with the owner account
    //   await memeKong.setTokenURI(0, newTokenURI);
    //   expect(await memeKong.tokenURI(0)).to.equal(newTokenURI);
    // });

    // it("should emit the correct events when a new token is minted", async () => {
    //   const { memeKong, owner, otherAccount } = await loadFixture(deploy);

    //   const mintTx = await memeKong.mint(otherAccount.address, "https://example.com/token123");
    
    //   // Check that the Transfer event was emitted
    //   expect(mintTx)
    //     .to.emit(memeKong, "Transfer")
    //     .withArgs(ethers.constants.AddressZero, otherAccount.address, 2);
    
    //   // Check that the Mint event was emitted
    //   expect(mintTx)
    //     .to.emit(memeKong, "Mint")
    //     .withArgs(otherAccount.address, 2, "https://example.com/token123");
    // });

    // it("should only allow the owner to withdraw funds from the contract", async () => {
    //   const { memeKong, owner, otherAccount } = await loadFixture(deploy);

    //   const initialBalance = await ethers.provider.getBalance(owner.address);
    
    //   // Try to withdraw funds with a non-owner account
    //   await expect(memeKong.connect(otherAccount).withdraw())
    //     .to.be.revertedWith("Ownable: caller is not the owner");
    
    //   // Withdraw funds with the owner account
    //   await memeKong.withdraw();
    
    //   // Check that the contract balance is zero
    //   expect(await ethers.provider.getBalance(memeKong.address)).to.equal(0);
    
    //   // Check that the owner received the correct amount of funds
    //   const finalBalance = await ethers.provider.getBalance(owner.address);
    //   const contractBalance = initialBalance.sub(finalBalance);
    //   expect(contractBalance).to.be.above(ethers.utils.parseEther("0.9"));
    // });
  });
});
