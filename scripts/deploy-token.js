// const { ethers } = require('@nomiclabs/buidler')
const hre = require("hardhat");

async function main () {

    const tokenContract = await hre.ethers.getContractFactory('USDCToken')
    const token = await tokenContract.deploy(100000);
    await token.deployed()
    console.log('token contract deployed to:', token.address);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })