import hardhat, { starknet } from "hardhat"
import { StarknetContractFactory } from "hardhat/types"

export async function getERC20Contract(address: string) {
    const erc20Factory = await starknet.getContractFactory("ERC20")
    return erc20Factory.getContractAt(address)
}

export async function getThirdPartyContractFactory(pathToContract: string) {
    // Append ".cairo" to path if it does not end with ".cairo"
    pathToContract = pathToContract.endsWith(".cairo") ? pathToContract : pathToContract + ".cairo"
    let contractFactory: StarknetContractFactory
    try {
        contractFactory = await starknet.getContractFactory(pathToContract)
    } catch (error) {
        await hardhat.run("starknet-compile", {
            paths: [pathToContract],
        })
        contractFactory = await starknet.getContractFactory(pathToContract)
    }
    return contractFactory
}
