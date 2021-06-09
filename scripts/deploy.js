// const { ethers } = require('@nomiclabs/buidler')
const hre = require("hardhat");

async function main () {


    // const plugToken = await hre.ethers.getContractFactory('PlugToken')
    // const plugToken = await Staking.deploy();
    // await plugToken.deployed()
    // console.log('Plug contract deployed to:', staking.address

    const plugTokenAddr = '0x78c3E13fdDC49f89feEB54C3FC47d7df611FA9BE';
    const lpTokenAddr = '0xfcC5A5E0a2039216f66963D2f1298e414a965942';
    const epoch1Start = 1621504800; //Thursday, May 20, 2021 10:00:00 PM GMT+12:00
    const epochDuration = 86400; // 1 day

    const Staking = await hre.ethers.getContractFactory('Staking')
    const staking = await Staking.deploy(epoch1Start, epochDuration)
    await staking.deployed()
    console.log('Staking contract deployed to:', staking.address)

    const communityVault = await ethers.getContractFactory('CommunityVault')
    const cv = await communityVault.deploy(plugTokenAddr)
    await cv.deployed()
    console.log('CommunityVault deployed to:', cv.address)

    const YieldFarm = await ethers.getContractFactory('PlugYieldFarm');
    const yflp = await YieldFarm.deploy(plugTokenAddr, lpTokenAddr, staking.address, cv.address);
    await yflp.deployed()
    console.log('YF_LP deployed to:', yflp.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })