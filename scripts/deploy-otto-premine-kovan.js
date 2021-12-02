// const { ethers } = require('@nomiclabs/buidler')
const hre = require("hardhat");

async function main () {

    const plugTokenAddr = '0xD1F9fD93af2AD6F90829E8415d79973FcFB4c8be';
    const epoch1Start = 1638144000; // Monday November 29, 2021 00:00:00 (am) in time zone UTC (UTC)
    const epochDuration = 345600; // Friday, December 3, 2021 0:00:00  

    // const stakingAddr = '0x403Badf2caba8037d9F00bbA02D59e20DB82709D';
    // const cvAddr = '0x80957883d147376ACF8c073c4297E9DD068cd9BC';

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