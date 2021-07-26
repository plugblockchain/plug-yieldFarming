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
// 0	token	address	0x44bc9215EF25eBFD7Be7C3679f20667480814af4
// 1	amountTokenDesired	uint256	1000000000000000000
// 2	amountTokenMin	uint256	995000000000000000
// 3	amountETHMin	uint256	8412526632621
// 4	to	address	0xa035F2A1fC34fec7EfbD2E9cA2d567c5Cc001d91
// 5	deadline	uint256	1627032448
    const token = '0x44bc9215EF25eBFD7Be7C3679f20667480814af4';
    const amountTokenDesired = BigNumber.from(10).mul(tenPow18);
    const amountTokenMin = BigNumber.from(9).mul(tenPow18);
    const ethAmount = "8454800635801";
    const amountETHMin = BigNumber.from(8412526632621);
    const to = '0xa035F2A1fC34fec7EfbD2E9cA2d567c5Cc001d91';
    const deadline = Math.floor(Date.now() / 1000) + 1800;

    let overrides = {
        // To convert Ether to Wei:
        // value: hre.ethers.utils.parseEther("0.0000084548")     // ether in this case MUST be a string
    
        // Or you can use Wei directly if you have that:
        // value: someBigNumber
        // value: 1234   // Note that using JavaScript numbers requires they are less than Number.MAX_SAFE_INTEGER
        value: "8454800635801"
        // value: "0x1234"
    
        // Or, promises are also supported:
        // value: provider.getBalance(addr)
    };

    const result = await contract.addLiquidityETH(token, amountTokenDesired, amountTokenMin, amountETHMin, to, deadline, overrides);
    // const result = await contract.connect(ac1).addLiquidityETH(token, amountTokenDesired, amountTokenMin, amountETHMin, to, deadline).send({ from: await ac1.getAddress(),value: ethAmount });
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