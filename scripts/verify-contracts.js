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
  //   address: "0x145Bf2d71849856597C05419d62C9B18C8d99862",
  //   constructorArguments: [
  //     1638144000, 345600
  //   ],
  // });

  // await hre.run("verify:verify", {
  //   contract: "contracts/CommunityVault.sol:CommunityVault",
  //   address: "0xD1bE814AA8d9C284489ec0d4a5387d7af8CA648e",
  //   constructorArguments: [
  //     "0xD1F9fD93af2AD6F90829E8415d79973FcFB4c8be"
  //   ],
  // });

  // await hre.run("verify:verify", {
  //   contract: "contracts/CommunityVault.sol:CommunityVault",
  //   address: "0xD1bE814AA8d9C284489ec0d4a5387d7af8CA648e",
  //   constructorArguments: [
  //     "0xD1F9fD93af2AD6F90829E8415d79973FcFB4c8be"
  //   ],
  // }); 

  // await hre.run("verify:verify", {
  //   contract: "contracts/PlugYieldFarm.sol:PlugYieldFarm",
  //   address: "0xCD86483DA756C61C40369020Ed52aFd084733531",
  //   constructorArguments: [
  //     "0xD1F9fD93af2AD6F90829E8415d79973FcFB4c8be",
  //     "0xD1F9fD93af2AD6F90829E8415d79973FcFB4c8be",
  //     "0x145Bf2d71849856597C05419d62C9B18C8d99862",
  //     "0xD1bE814AA8d9C284489ec0d4a5387d7af8CA648e"
  //   ],
  // }); 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
