// const { ethers } = require('@nomiclabs/buidler')
const { BigNumber } = require("@ethersproject/bignumber");
const hre = require("hardhat");

async function main () {

    // to set allowances:
    const plugPoolAddr = '0x6F7E84C2B019B003f28E31aB6A0D4eD83199E3eB';
    const plugEthPoolAddr = '0x6650e39D5D0c01b7e3298d3CA0D1ef8Ca85f2A5C';
    const plugUsdcPoolAddr = '0x9bc558a224dA1695ae1CEd9d3760249D0efaF5C0';
    const cvAddress = '0xe0BB6c11FC2caC863C4ebD3d6e8d7B1CdA3B6060';

    const plugTokenAddr = '0x47DA5456bC2e1ce391b645Ce80F2E97192e4976a';
    const PlugToken = await hre.ethers.getContractFactory('PlugToken')
    const plugToken = await PlugToken.attach(plugTokenAddr);

    const existingAllowanceForPlugPool = await plugToken.allowance(cvAddress, plugPoolAddr);
    console.log(`Existing allowance for plug pool: ${existingAllowanceForPlugPool}`)
    const existingAllowanceForPlugEthPool = await plugToken.allowance(cvAddress, plugEthPoolAddr);
    console.log(`Existing allowance for plug/eth pool: ${existingAllowanceForPlugEthPool}`)
    const existingAllowanceForPlugUsdcPool = await plugToken.allowance(cvAddress, plugUsdcPoolAddr);
    console.log(`Existing allowance for plug/usdc pool: ${existingAllowanceForPlugUsdcPool}`)

    // set allowance --- wait for transfer done
    const tenPow18 = BigNumber.from(10).pow(18);
    const plugAmount = BigNumber.from(6_000_000).mul(tenPow18).mul(4).add(existingAllowanceForPlugPool); // monthly
    const plugEthlpAmount = BigNumber.from(7_000_000).mul(tenPow18).mul(4).add(existingAllowanceForPlugEthPool); // monthly
    const plugUsdclpAmount = BigNumber.from(7_000_000).mul(tenPow18).mul(4).add(existingAllowanceForPlugUsdcPool); // monthly

    const CV = await hre.ethers.getContractFactory('CommunityVault')
    const cv = await CV.attach(cvAddress);

    const [deployer] = await hre.ethers.getSigners();
    console.log("Adding Allowance with the account:", deployer.address);
    console.log("Account balance before:", (await deployer.getBalance()).toString())

    console.log(`setting allowance ${plugAmount} to plug pool`);
    await cv.connect(deployer).setAllowance(plugPoolAddr, plugAmount);
    console.log(`setting allowance ${plugEthlpAmount} to plug/eth pool`);
    await cv.connect(deployer).setAllowance(plugEthPoolAddr, plugEthlpAmount);
    console.log(`setting allowance ${plugUsdclpAmount} to plug/usdc pool`);
    await cv.connect(deployer).setAllowance(plugUsdcPoolAddr, plugUsdclpAmount);

    console.log("Account balance after:", (await deployer.getBalance()).toString());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })