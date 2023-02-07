import { isBN } from "bn.js"
import { expect } from "chai"
import { toHex } from "./data"

export function expectHexEqual(actual: string, expected: string) {
    expect(toHex(actual)).to.equal(toHex(expected))
}

export function expectFeeEstimationStructure(fee: object) {
    console.log("Estimated fee:", fee)
    if ("amount" in fee) {
        expect(typeof fee["amount"]).to.equal("bigint")
        expect(fee["unit"]).to.equal("wei")
        expect(typeof fee["gas_price"]).to.equal("bigint")
        expect(typeof fee["gas_usage"]).to.equal("bigint")
    } else if ("overall_fee" in fee) {
        expect(isBN(fee["overall_fee"])).to.be.true
        expect(isBN(fee["gas_consumed"])).to.be.true
        expect(isBN(fee["gas_price"])).to.be.true
        expect(isBN(fee["suggestedMaxFee"])).to.be.true
    } else {
        throw Error("Not expected fee estimation sturction")
    }
}
