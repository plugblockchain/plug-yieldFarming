const hre = require("hardhat");

async function main() {
  // verify nft token
  await hre.run("verify:verify", {
    address: "0x75c8534C6DfE777Ad7Bbc5e50B9EE868eBf52DEf",
    constructorArguments: [
      1625443200,
      604800
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
