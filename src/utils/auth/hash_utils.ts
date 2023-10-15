import {hash, compare} from "bcrypt";

export const generate_hash = (value: string)=>{
    return  hash(value, 12);
}

export const compare_hash = (value: string, hash: string)=>{
    return compare(value, hash);
}