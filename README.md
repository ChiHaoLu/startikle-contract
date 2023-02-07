# StarkHermes

## Prepocessing

1. Make sure you have `node.js > 14.6`
1. `$ yarn install`
1. `$ cp .env.example .env`
1. Filling the params in the `.env`
1. Check the `starknet.network` field in `hardhat.config.ts`, replace it with `alpha-goerli` or `alpha-mainnet`(Unsupported)

```typescript
module.exports = {
    starknet: {
        venv: "active",
        recompile: false,
        network: "alpha-goerli", # change the network name here
        wallets: {
            OpenZeppelin: {
                accountName: "OpenZeppelin",
                modulePath: "starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount",
                accountPath: "~/.starknet_accounts",
            }
        },
    },
}
```

> Be sure entered the VE and prepared the `cairo-lang`.

```
$ python3.9 -m venv .venv
$ source .venv/bin/activate
$ pip install cairo-lang
$ starknet --version
> starknet 0.10.2 // ✅
$ starknet get_block --network alpha-goerli
> { ... } // ✅ the terminal will print lots of block information
```

## How to use Faucet

1. `$ yarn execute scripts/transferToL2FaucetAccount.ts --network <L1_network_name>`
1. Check the log information is correct.

```
$ yarn execute scripts/transferToL2FaucetAccount.ts --network goerli
>
yarn run v1.22.19
$ node -r ts-node/register -r tsconfig-paths/register hardhatRunWithArgs.ts scripts/transferToL2FaucetAccount.ts --network goerli
✔ Please enter the amount (in ETH, not wei) for refilling the L2 FaucetAccount from L1: … 0.000088

Calling StarkNet - for Account Balance...
    L2 Account Address 0x01a64e56778a3d208caac766f4f211a227f27eb89598f91393ff038dd0c7e1b5 has a balance of: 0.008313477799502369 ETH

L1 Transaction on goerli: Call The Deposit Function on L1 StarkGate:
    L1 Account Address 0xB42faBF7BCAE8bc5E368716B568a6f8Fdf3F84ec has a balance of: 11.049175227537823618 ETH
    Trying to transfer 0.000088 ETH:
        from 0xB42faBF7BCAE8bc5E368716B568a6f8Fdf3F84ec (L1 FaucetAccount)
        to 0xc3511006C04EF1d78af4C8E0e74Ec18A6E64Ff9e (L1 StarkGate)
    Tx successful with hash: 0x3e929dc0612498e5105cec4b86785595bb335c7def0edfafd4b5f2ecbe5cb274

L2 Transaction on starknetGoerli is being triggered by Sequencer...
    MsgHash:  0x7852d7a5827bf0b6e69d97598fa5abdd89839018d638e878256459720180fb98
    TxHash:  0x265d2a64114c07c70c2de3e608e4a535eec5742020c05e0b28a2abda1062a0b
    Waiting for the transaction finished...
(node:51129) ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
    Tx was successful, see the detail in StarkScan: https://testnet.starkscan.co/tx/0x265d2a64114c07c70c2de3e608e4a535eec5742020c05e0b28a2abda1062a0b

Calling StarkNet - starknetGoerli for Account Balance...
    L2 Account Address 0x01a64e56778a3d208caac766f4f211a227f27eb89598f91393ff038dd0c7e1b5 has a balance of: 0.008500477799502369 ETH
✨  Done in 173.47s.
```
