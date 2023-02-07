import { starknet } from "hardhat"
import { Account } from "hardhat/types/runtime"

export async function getPredeployedAccounts() {
    const accounts = await starknet.devnet.getPredeployedAccounts()
    const results: Account[] = []

    for (const account of accounts) {
        results.push(
            await starknet.OpenZeppelinAccount.getAccountFromAddress(
                account.address,
                account.private_key,
            ),
        )
    }

    return results
}
