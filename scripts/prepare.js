// const { ethers } = require('@nomiclabs/buidler')
const { BigNumber } = require("@ethersproject/bignumber");
const hre = require("hardhat");
// const { BigNumber } = require('hre');

async function main () {

    const rewardTokenAddr = '0x44bc9215EF25eBFD7Be7C3679f20667480814af4';
    const yfAddress = '0xfCac122EA3B0458c0051332d19040bed6C7DE9e9';
    const cvAddress = '0x80957883d147376ACF8c073c4297E9DD068cd9BC';
    const mintAmount = 150_000_000;

    const [ac1, ac2, ac3] = await hre.ethers.getSigners();
    ac1Addr = await ac1.getAddress();
    ac2Addr = await ac2.getAddress();
    ac3Addr = await ac3.getAddress();

    const PlugToken = await hre.ethers.getContractFactory('PlugToken')
    const plugToken = await PlugToken.attach(rewardTokenAddr);

    const CV = await hre.ethers.getContractFactory('CommunityVault')
    const cv = await CV.attach(cvAddress);

    const tenPow18 = BigNumber.from(10).pow(18);
    const amount = BigNumber.from(mintAmount).mul(tenPow18);
    await plugToken.mint(cvAddress, amount);
    await cv.connect(ac1).setAllowance(yfAddress, amount);
    console.log(`Successfully mint and allowance cv: ${amount/tenPow18}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
