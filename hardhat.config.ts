import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-ethers"
import "@shardlabs/starknet-hardhat-plugin"
import "tsconfig-paths/register"

import dotenv from "dotenv"
dotenv.config()

import chai from "chai"
import chaiAsPromised from "chai-as-promised"
chai.use(chaiAsPromised)

const accounts = {
    mnemonic: process.env.MNEMONIC || "test test test test test test test test test test test junk",
}
const ALCHEMY_TOKEN = process.env.ALCHEMY_TOKEN || ""

module.exports = {
    starknet: {
        // dockerizedVersion: "0.10.1", // alternatively choose one of the two venv options below
        // uses (my-venv) defined by `python -m venv path/to/my-venv`
        // venv: "path/to/my-venv",
        // uses the currently active Python environment (hopefully with available Starknet commands!)
        venv: "active",
        recompile: false,
        network: process.env.STARKNET,
        wallets: {
            OpenZeppelin: {
                accountName: "OpenZeppelin",
                modulePath: "starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount",
                accountPath: "~/.starknet_accounts",
            },
        },
    },
    networks: {
        localhost: {
            url: "http://localhost:8545",
            accounts,
        },
        hardhat: {
            // chainId: 1,
            // accounts,
            // forking: {
            //     url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_TOKEN}`,
            //     blockNumber: 12650600,
            // },
        },
        mainnet: {
            chainId: 1,
            url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_TOKEN}`,
            accounts,
        },
        goerli: {
            chainId: 5,
            url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_TOKEN}`,
            accounts,
        },

        // StarkNet

        integratedDevnet: {
            url: "http://127.0.0.1:5050",
            dockerizedVersion: "0.4.3",
            // venv: "active",
        },
        starknetDevnet: {
            url: "http://127.0.0.1:5050",
        },
        starknetMainnet: {
            url: "https://alpha-mainnet.starknet.io",
        },
        starknetGoerli: {
            url: "https://alpha4.starknet.io",
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.17",
                settings: {
                    optimizer: {
                        enabled: true,
                    },
                },
            },
        ],
    },
    mocha: {
        timeout: 900000, // 15 mins
    },
    paths: {
        cairoPaths: ["./node_modules/openzeppelin__cairo_contracts/src"],
    },
}
