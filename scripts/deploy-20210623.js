// const { ethers } = require('@nomiclabs/buidler')
const { BigNumber } = require("@ethersproject/bignumber");
const hre = require("hardhat");

async function main () {

    const plugTokenAddr = '0x47DA5456bC2e1ce391b645Ce80F2E97192e4976a';
    const ethPlugLpTokenAddr = '0xee597f571c65c5abfa56a8128c4b7bb7fb31ebc6';
    const usdcPlugLpTokenAddr = '0x1fead6b98371793a0897b3d1a9402e4bb9906775';
    const epoch1Start = 1625443200; // Date and time (GMT): Monday, July 5, 2021 0:00:00 
    const epochDuration = 604800; // 1 week

    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance before:", (await deployer.getBalance()).toString());
  
    // deploy Staking
    const Staking = await hre.ethers.getContractFactory('Staking')
    const staking = await Staking.deploy(epoch1Start, epochDuration)
    await staking.deployed()
    console.log('Staking contract deployed to:', staking.address);

    // deploy communityVault
    const communityVault = await ethers.getContractFactory('CommunityVault')
    const cv = await communityVault.deploy(plugTokenAddr)
    await cv.deployed()
    console.log('CommunityVault deployed to:', cv.address);

    // deploy LP Pools
    const lpYFContract = await ethers.getContractFactory('LPYieldFarm');
    const ethPlugPool = await lpYFContract.deploy(plugTokenAddr, ethPlugLpTokenAddr, staking.address, cv.address);
    await ethPlugPool.deployed()
    console.log('ETH/PLUG Pool deployed to:', ethPlugPool.address);

    const usdcPlugPool = await lpYFContract.deploy(plugTokenAddr, usdcPlugLpTokenAddr, staking.address, cv.address);
    await usdcPlugPool.deployed()
    console.log('USDC/PLUG Pool deployed to:', usdcPlugPool.address);

    // deploy plug pool
    const plugYFContract = await ethers.getContractFactory('PlugYieldFarm');

    const plugPool = await plugYFContract.deploy(plugTokenAddr, plugTokenAddr, staking.address, cv.address);
    await plugPool.deployed()
    console.log('PLUG Pool deployed to:', plugPool.address);

    // set allowance --- wait for transfer done
    // const tenPow18 = BigNumber.from(10).pow(18);
    // const plugAmount = BigNumber.from(150_000_000).mul(tenPow18);
    // const lpAmount = BigNumber.from(175_000_000).mul(tenPow18);
    // await cv.connect(deployer).setAllowance(plugPool.address, plugAmount);
    // await cv.connect(deployer).setAllowance(ethPlugPool.address, lpAmount);
    // await cv.connect(deployer).setAllowance(usdcPlugPool.address, lpAmount);

    console.log("Account balance after:", (await deployer.getBalance()).toString());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })