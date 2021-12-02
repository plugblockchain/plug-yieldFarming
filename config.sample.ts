// import 'dotenv/config';
import { NetworksUserConfig } from "hardhat/types";
import { EtherscanConfig } from "@nomiclabs/hardhat-etherscan/dist/src/types";

export const networks: NetworksUserConfig = {
    // Needed for `solidity-coverage`
    coverage: {
        url: "http://localhost:8555"
    },

    ganache: {
      url: "http://127.0.0.1:7545"
    },

    ropsten: {
      url: "https://ropsten.infura.io/v3/",
      chainId: 3,
      // accounts: [""],
      accounts: {
        mnemonic: "",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10
      },
      // gas: "auto",
      // gasPrice: 1000000000, // 1 gwei
      // gasMultiplier: 1.5
    },

    rinkeby: {
      chainId: 4,
      url: `https://rinkeby.infura.io/v3/`,
      // accounts: [process.env.PRIVATE_KEY],
      accounts: {
        mnemonic: "",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
      },
    },

    kovan: {
      url: "https://kovan.infura.io/v3/",
      chainId: 42,
      // accounts: [""],
      accounts: {
        mnemonic: "",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10
      },
      gas: "auto",
      gasPrice: 1000000000, // 1 gwei
      gasMultiplier: 1.5
    },

    // Mainnet
    mainnet: {
        url: "https://mainnet.infura.io/v3/",
        chainId: 1,
        accounts: [""],
        gas: "auto",
        gasPrice: "auto",
        blockGasLimit: 24000000,

    }
};

// Use to verify contracts on Etherscan
// https://buidler.dev/plugins/nomiclabs-buidler-etherscan.html
export const etherscan: EtherscanConfig = {
    apiKey: "" 
};
