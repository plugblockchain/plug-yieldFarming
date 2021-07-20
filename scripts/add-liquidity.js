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

  
    const kovanAddr = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
    const contractAddr = kovanAddr;

    // Connect to Contract
    const contractFactory = await hre.ethers.getContractFactory('UniswapV2Router02')
    const contract = await contractFactory.attach(contractAddr);
    
    // User address
    const [ac1, ac2, ac3] = await hre.ethers.getSigners();
    const investor = ac1;
    const investorAddr = await investor.getAddress();

    const tenPow18 = BigNumber.from(10).pow(18);
    const tenPow6 = BigNumber.from(10).pow(6);

//     #	Name	Type	Data
// 0	tokenA	address	0x44bc9215EF25eBFD7Be7C3679f20667480814af4
// 1	tokenB	address	0x0d757FbF1b0743Db0e6e02AA2A8f18D4c695a1F9
// 2	amountADesired	uint256	1234000000000000000000
// 3	amountBDesired	uint256	26255319
// 4	amountAMin	uint256	1227830000000000000000
// 5	amountBMin	uint256	26124042
// 6	to	address	0xa035F2A1fC34fec7EfbD2E9cA2d567c5Cc001d91
// 7	deadline	uint256	1626735724
    const tokenA = '0x44bc9215EF25eBFD7Be7C3679f20667480814af4';
    const tokenB = '0x0d757FbF1b0743Db0e6e02AA2A8f18D4c695a1F9';
    const amountADesired = BigNumber.from(12345).mul(tenPow18);
    const amountBDesired = BigNumber.from(262).mul(tenPow6);
    const amountAMin = BigNumber.from(12275).mul(tenPow18);
    const amountBMin = BigNumber.from(261).mul(tenPow6);
    const to = '0xa035F2A1fC34fec7EfbD2E9cA2d567c5Cc001d91';
    const deadline = Math.floor(Date.now() / 1000) + 1800;

    const result = await contract.addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, to, deadline);
    // console.log(`Added Token A: ${amountA}`);
    // console.log(`Added Token B: ${amountB}`);
    // console.log(`Got liquidity: ${liquidity}`);
    console.log(`Got liquidity: ${JSON.stringify(result)}`);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })