// const { ethers } = require('@nomiclabs/buidler')
const { BigNumber } = require("@ethersproject/bignumber");
const hre = require("hardhat");
// const { BigNumber } = require('hre');

async function main () {

    const mandy = '0x111dAE1358332dB4EDA6d00b684117eab2f604d0';
    const kun = '0xa035F2A1fC34fec7EfbD2E9cA2d567c5Cc001d91';
    const kun2 = '0x809c27D85B95317A11d1D97a011483029D1528EE';
    const phil = '0x6d3Aa1bfB50bEE2e20F6D480Aa54Af5495996122';
    const will = '0xbeC4A6cBA413EE6baa7F21B79B48aF27441Eb6c6';
    const toAddress = will;
    const toAmount = 10000000;

    const tokenContract = 'PlugToken';
   // const tokenAddr = '0x44bc9215EF25eBFD7Be7C3679f20667480814af4';
    const tokenDecimal = 6;

    const tokenAddr = '0x0d757FbF1b0743Db0e6e02AA2A8f18D4c695a1F9';
    

    // const [ac1, ac2, ac3] = await hre.ethers.getSigners();
    // ac1Addr = await ac1.getAddress();
    // ac2Addr = await ac2.getAddress();
    // ac3Addr = await ac3.getAddress();

    const PlugToken = await hre.ethers.getContractFactory(tokenContract);
    const plugToken = await PlugToken.attach(tokenAddr);

    const tenPow18 = BigNumber.from(10).pow(tokenDecimal);
    const amount = BigNumber.from(toAmount).mul(tenPow18);
    await plugToken.mint(toAddress, amount);
    console.log(`Successfully mint ${amount}`);

    let totalSupply = await plugToken.totalSupply();
    console.log(`Total supply is ${totalSupply}`);

    const balance = await plugToken.balanceOf(toAddress);
    console.log(`balance is ${balance}`); 
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
