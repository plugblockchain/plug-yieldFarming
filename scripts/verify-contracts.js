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
  //   address: "0x403Badf2caba8037d9F00bbA02D59e20DB82709D",
  //   constructorArguments: [
  //     1638748800, 14515200
  //   ],
  // });

  // await hre.run("verify:verify", {
  //   contract: "contracts/CommunityVault.sol:CommunityVault",
  //   address: "0x80957883d147376ACF8c073c4297E9DD068cd9BC",
  //   constructorArguments: [
  //     "0xD1F9fD93af2AD6F90829E8415d79973FcFB4c8be"
  //   ],
  // });

  await hre.run("verify:verify", {
    contract: "contracts/PlugYieldFarm.sol:PlugYieldFarm",
    address: "0x941C8d9EBacEB31fC7442e10b8aa4666ABE57FCc",
    constructorArguments: [
      "0xD1F9fD93af2AD6F90829E8415d79973FcFB4c8be",
      "0xD1F9fD93af2AD6F90829E8415d79973FcFB4c8be",
      "0x403Badf2caba8037d9F00bbA02D59e20DB82709D",
      "0x80957883d147376ACF8c073c4297E9DD068cd9BC"
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
