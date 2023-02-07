export function toHex(value: string) {
    return "0x" + BigInt(value).toString(16)
}
