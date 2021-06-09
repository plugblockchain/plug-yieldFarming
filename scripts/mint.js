// const { ethers } = require('@nomiclabs/buidler')
const { BigNumber } = require("@ethersproject/bignumber");
const hre = require("hardhat");
// const { BigNumber } = require('hre');

async function main () {

    const toAddress = '0x89F7e70c568d114Cd4Ce3b2d900dE595CDB514A8';

    const [ac1, ac2, ac3] = await hre.ethers.getSigners();
    ac1Addr = await ac1.getAddress();
    ac2Addr = await ac2.getAddress();
    ac3Addr = await ac3.getAddress();

    const PlugToken = await hre.ethers.getContractFactory('PlugToken')
    const plugToken = await PlugToken.attach("0x78c3E13fdDC49f89feEB54C3FC47d7df611FA9BE");

    const tenPow18 = BigNumber.from(10).pow(18);
    const amount = BigNumber.from(100).mul(tenPow18);
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
