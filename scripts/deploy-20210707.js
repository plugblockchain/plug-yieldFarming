// const { ethers } = require('@nomiclabs/buidler')
const { BigNumber } = require("@ethersproject/bignumber");
const hre = require("hardhat");

async function main () {

    // to set allowances:
    const plugPoolAddr = '0x6F7E84C2B019B003f28E31aB6A0D4eD83199E3eB';
    const plugEthPoolAddr = '0x6650e39D5D0c01b7e3298d3CA0D1ef8Ca85f2A5C';
    const plugUsdcPoolAddr = '0x9bc558a224dA1695ae1CEd9d3760249D0efaF5C0';
    const cvAddress = '0xe0BB6c11FC2caC863C4ebD3d6e8d7B1CdA3B6060';

    // set allowance --- wait for transfer done
    const tenPow18 = BigNumber.from(10).pow(18);
    const plugAmount = BigNumber.from(6_000_000).mul(tenPow18).mul(4); // monthly
    const lpAmount = BigNumber.from(7_000_000).mul(tenPow18).mul(4); // monthly

    const CV = await hre.ethers.getContractFactory('CommunityVault')
    const cv = await CV.attach(cvAddress);

    const [deployer] = await hre.ethers.getSigners();
    console.log("Setting Allowance with the account:", deployer.address);
    console.log("Account balance before:", (await deployer.getBalance()).toString())

    console.log(`setting allowance ${plugAmount} to plug pool`);
    await cv.connect(deployer).setAllowance(plugPoolAddr, plugAmount);
    console.log(`setting allowance ${lpAmount} to plug/eth pool`);
    await cv.connect(deployer).setAllowance(plugEthPoolAddr, lpAmount);
    console.log(`setting allowance ${lpAmount} to plug/usdc pool`);
    await cv.connect(deployer).setAllowance(plugUsdcPoolAddr, lpAmount);

    console.log("Account balance after:", (await deployer.getBalance()).toString());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })