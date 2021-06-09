// const { ethers } = require('@nomiclabs/buidler')
const { BigNumber } = require("@ethersproject/bignumber");
const hre = require("hardhat");
// const { BigNumber } = require('hre');

async function main () {

    const yfAddress = '0x97C07AD3f77942B7a96f74dC8596279c01B5b0B7';
    const cvAddress = '0x035AC5BC586Cc8b31eD8Bd42051cE595DeB84Eea';
    const mintAmount = 2_000_000;

    const [ac1, ac2, ac3] = await hre.ethers.getSigners();
    ac1Addr = await ac1.getAddress();
    ac2Addr = await ac2.getAddress();
    ac3Addr = await ac3.getAddress();

    const PlugToken = await hre.ethers.getContractFactory('PlugToken')
    const plugToken = await PlugToken.attach("0x78c3E13fdDC49f89feEB54C3FC47d7df611FA9BE");

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
