// const { ethers } = require('@nomiclabs/buidler')
const hre = require("hardhat");

async function main () {

    const plugTokenAddr = '0xD1F9fD93af2AD6F90829E8415d79973FcFB4c8be';
    const epoch1Start = 1640563200; // MMonday, December 6, 2021 0:00:00
    const epochDuration = 15120000; // 168 days, Monday, May 23, 2022 0:00:00 

    const staking = { address: '0x403Badf2caba8037d9F00bbA02D59e20DB82709D' };
    const cv = { address: '0x80957883d147376ACF8c073c4297E9DD068cd9BC' };

    // const Staking = await hre.ethers.getContractFactory('Staking')
    // const staking = await Staking.deploy(epoch1Start, epochDuration)
    // await staking.deployed()
    // console.log('Staking contract deployed to:', staking.address)

    // const communityVault = await ethers.getContractFactory('CommunityVault')
    // const cv = await communityVault.deploy(plugTokenAddr)
    // await cv.deployed()
    // console.log('CommunityVault deployed to:', cv.address)

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