import axios from "axios"
import { starknet } from "hardhat"
import { uint256 } from "starknet"
import { FEE_TOKEN_ADDRESS } from "./constant"
import { getERC20Contract } from "./contract"

export class FeeToken {
    static async getBalance(address: string): Promise<bigint> {
        const feeToken = await FeeToken.getContract()
        const { balance } = await feeToken.call("balanceOf", {
            account: address,
        })
        return BigInt(uint256.uint256ToBN(balance).toString())
    }

    static getContract() {
        return getERC20Contract(FEE_TOKEN_ADDRESS)
    }

    static async mint(address: string, amount: bigint) {
        await axios.post(`${starknet.networkConfig?.url}/mint`, {
            address,
            amount: Number(amount),
        })
    }
}
