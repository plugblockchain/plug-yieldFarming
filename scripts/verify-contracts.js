const hre = require("hardhat");

async function main() {
  // verify nft token
  // await hre.run("verify:verify", {
  //   contract: "contracts/PlugToken.sol:PlugToken",
  //   address: "0xD1F9fD93af2AD6F90829E8415d79973FcFB4c8be",
  //   constructorArguments: [
  //   ],
  // });

  // await hre.run("verify:verify", {
  //   contract: "contracts/Staking.sol:Staking",
  //   address: "0x1C899B399998e984a3bBfB99e37BF5C692127154",
  //   constructorArguments: [
  //     1640563200, 15120000
  //   ],
  // });

  // await hre.run("verify:verify", {
  //   contract: "contracts/CommunityVault.sol:CommunityVault",
  //   address: "0x918ea5c939Dd25B202b46e8b5Ee54f54D623f380",
  //   constructorArguments: [
  //     "0x47DA5456bC2e1ce391b645Ce80F2E97192e4976a"
  //   ],
  // });

  await hre.run("verify:verify", {
    contract: "contracts/PlugYieldFarm.sol:PlugYieldFarm",
    address: "0x78Ac220f81f78780B4Ae9037598d6Ee5b096D5F5",
    constructorArguments: [
      "0x47DA5456bC2e1ce391b645Ce80F2E97192e4976a",
      "0x47DA5456bC2e1ce391b645Ce80F2E97192e4976a",
      "0x1C899B399998e984a3bBfB99e37BF5C692127154",
      "0x918ea5c939Dd25B202b46e8b5Ee54f54D623f380"
    ],
  }); 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
