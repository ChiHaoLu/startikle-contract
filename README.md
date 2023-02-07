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

### Contracts

Compile & Declaration
```
$ cd contracts
$ starknet-compile Startikle.cairo \
    --output Startikle_compiled.json \
    --abi Startikle_abi.json
$ starknet declare --contract Startikle_compiled.json --max_fee 999999995550000
>

```

Deploy
```
$ starknet deploy --class_hash 0x \
    --max_fee 999999995550000
>

```

Upload New Post: `upload_post(user: felt, id: felt, uri_len: felt, uri: felt*)`
```
$ starknet invoke \
    --address 0x \
    --abi Startikle_abi.json \
    --function upload_post \
    --inputs \
         \
         \
        67 \
         \
    --max_fee 99999999555000000
>

```

Get Post CID: `get_articleURI(user: felt, id: felt)`
```
$ starknet call \
    --address 0x \
    --abi Startikle_abi.json \
    --function get_articleURI \
    --inputs \
     \
     \
    --max_fee 9999999955500000
>

```


## Useful Tool

Check Account Information
```
$ ls ~/.starknet_accounts/starknet_open_zeppelin_accounts.json
```

Change String to ASCII
```
$ python
>>> s = 'ipfs://'
>>> [ord(c) for c in s]
[105, 112, 102, 115, 58, 47, 47]
```