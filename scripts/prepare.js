// const { ethers } = require('@nomiclabs/buidler')
const { BigNumber } = require("@ethersproject/bignumber");
const hre = require("hardhat");
// const { BigNumber } = require('hre');

async function main () {

    const rewardTokenAddr = '0x47da5456bc2e1ce391b645ce80f2e97192e4976a';
    const yfAddress = '0x78Ac220f81f78780B4Ae9037598d6Ee5b096D5F5';
    const cvAddress = '0x918ea5c939Dd25B202b46e8b5Ee54f54D623f380';
    const mintAmount = 250_000_000;

    const [ac1, ac2, ac3] = await hre.ethers.getSigners();
    // ac1Addr = await ac1.getAddress();
    // ac2Addr = await ac2.getAddress();
    // ac3Addr = await ac3.getAddress();

    const PlugToken = await hre.ethers.getContractFactory('PlugToken')
    const plugToken = await PlugToken.attach(rewardTokenAddr);

    // 1 check current allowance
    const existingAllowanceForYf = await plugToken.allowance(cvAddress, yfAddress);
    console.log(`Existing allowance for yf: ${existingAllowanceForYf}`)

    const CV = await hre.ethers.getContractFactory('CommunityVault')
    const cv = await CV.attach(cvAddress);

    // 2 mint to CV
    // const tenPow18 = BigNumber.from(10).pow(18);
    // const amount = BigNumber.from(mintAmount).mul(tenPow18).add(existingAllowanceForYf);
    // await plugToken.mint(cvAddress, amount);

    // 3 approve yf
    // await cv.connect(ac1).setAllowance(yfAddress, amount);
    // console.log(`Successfully set allowance cv: ${amount/tenPow18}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
