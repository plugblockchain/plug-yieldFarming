// const { ethers } = require('@nomiclabs/buidler')
const hre = require("hardhat");

async function main () {

    const plugTokenAddr = '0x47DA5456bC2e1ce391b645Ce80F2E97192e4976a';
    const epoch1Start = 1640563200; // Monday, December 27, 2021 12:00:00 AM
    const epochDuration = 15120000; // 25 weeks, Monday, June 20, 2022 12:00:00 AM

    const Staking = await hre.ethers.getContractFactory('Staking')
    const staking = await Staking.deploy(epoch1Start, epochDuration)
    await staking.deployed()
    console.log('Staking contract deployed to:', staking.address)

    const communityVault = await ethers.getContractFactory('CommunityVault')
    const cv = await communityVault.deploy(plugTokenAddr)
    await cv.deployed()
    console.log('CommunityVault deployed to:', cv.address)

    const YieldFarm = await ethers.getContractFactory('PlugYieldFarm');
    const yflp = await YieldFarm.deploy(plugTokenAddr, plugTokenAddr, staking.address, cv.address);
    await yflp.deployed()
    console.log('YF_LP deployed to:', yflp.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })