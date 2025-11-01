import baseX from 'base-x';
import Hashids from 'hashids';

const BASE62_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const base62 = baseX(BASE62_ALPHABET);

const hashid = new Hashids('testing',6)
export function encodeId(id: number): string {

    const hashidEncode = hashid.encode(id)
    const baseEncode = base62.encode(Buffer.from(hashidEncode)) 
    return baseEncode
}

export function decodeId(encoded: string): string | null {
    const decodeed62 = Buffer.from(base62.decode( encoded )).toString()
    const has = hashid.decode(decodeed62)
    if(has.length === 0)return null

    return has[0].toString()
}
