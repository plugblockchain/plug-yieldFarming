// const { ethers } = require('@nomiclabs/buidler')
const { BigNumber } = require("@ethersproject/bignumber");
const hre = require("hardhat");

async function main () {

    const plugTokenAddr = '0x44bc9215EF25eBFD7Be7C3679f20667480814af4';
    const ethPlugLpTokenAddr = '0x402d4122bff42f2a4e2c32732827af4d476f5728';
    const usdcPlugLpTokenAddr = '0x68559fe116232ad27f749261bca00bc7b8b5eb61';
    const epoch1Start = 1624885200;
    const epochDuration = 604800; // 1 week

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

    // set allowance
    const [ac1] = await hre.ethers.getSigners();
    const tenPow18 = BigNumber.from(10).pow(18);
    const plugAmount = BigNumber.from(150_000_000).mul(tenPow18);
    const lpAmount = BigNumber.from(175_000_000).mul(tenPow18);
    await cv.connect(ac1).setAllowance(plugPool.address, plugAmount);
    await cv.connect(ac1).setAllowance(ethPlugPool.address, lpAmount);
    await cv.connect(ac1).setAllowance(usdcPlugPool.address, lpAmount);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })