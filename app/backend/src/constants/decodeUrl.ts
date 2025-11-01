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


