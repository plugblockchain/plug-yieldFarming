// const { ethers } = require('@nomiclabs/buidler')
const hre = require("hardhat");

async function main () {

    const tokenContract = await hre.ethers.getContractFactory('PlugToken')
    const token = await tokenContract.deploy();
    console.log('PlugToken deployed to:', token.address);
    await token.deployed()
    console.log('token contract deployed to:', token.address);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })