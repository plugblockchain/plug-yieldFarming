// const { ethers } = require('@nomiclabs/buidler')
const hre = require("hardhat");

async function main () {

    const plugTokenAddr = '0x44bc9215EF25eBFD7Be7C3679f20667480814af4';
    const lpTokenAddr = '0x68559fe116232ad27f749261bca00bc7b8b5eb61';
    // const epoch1Start = 1623628800; //Monday, June 14, 2021 0:00:00 GMT 
    // const epochDuration = 604800; // 1 week

    const stakingAddr = '0x403Badf2caba8037d9F00bbA02D59e20DB82709D';
    const cvAddr = '0x80957883d147376ACF8c073c4297E9DD068cd9BC';

    // const Staking = await hre.ethers.getContractFactory('Staking')
    // const staking = await Staking.deploy(epoch1Start, epochDuration)
    // await staking.deployed()
    // console.log('Staking contract deployed to:', staking.address)

    // const communityVault = await ethers.getContractFactory('CommunityVault')
    // const cv = await communityVault.deploy(plugTokenAddr)
    // await cv.deployed()
    // console.log('CommunityVault deployed to:', cv.address)

    const YieldFarm = await ethers.getContractFactory('PlugYieldFarm');
    const yflp = await YieldFarm.deploy(plugTokenAddr, lpTokenAddr, stakingAddr, cvAddr);
    await yflp.deployed()
    console.log('YF_LP deployed to:', yflp.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })