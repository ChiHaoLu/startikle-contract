// Reference: https://github.com/immutable/imx-starknet/blob/main/tests/utils/starknetUtils.ts
export class Felt {
    public static fromString(value: string): bigint {
        if (value.length > 31) {
            throw Error("unable to convert to felt: string greater than 31 chars")
        }
        const strarr = value.split("")
        const ss = strarr.reduce((r, c) => r + c.charCodeAt(0).toString(16), "")
        return BigInt("0x" + ss)
    }
}
