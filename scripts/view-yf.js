// const { ethers } = require('@nomiclabs/buidler')
const { BigNumber } = require("@ethersproject/bignumber");
const hre = require("hardhat");
// const { BigNumber } = require('hre');

async function main () {

    console.log('********************************************************');
    console.log('********************************************************');
    console.log('*************************start *************************');
    console.log('********************************************************');
    console.log('********************************************************');;

  
    // YF Contract
    const YFContract = await hre.ethers.getContractFactory('PlugYieldFarm')
    const yfContract = await YFContract.attach("0xfCac122EA3B0458c0051332d19040bed6C7DE9e9");
    
    // User address
    const [ac1, ac2, ac3] = await hre.ethers.getSigners();
    const investor = ac1;
    const investorAddr = await investor.getAddress();

    const distrubution = await yfContract.TOTAL_DISTRIBUTED_AMOUNT();
    console.log(`TOTAL_DISTRIBUTED_AMOUNT: ${distrubution}`);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })