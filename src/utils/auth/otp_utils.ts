import otpGenerator from "otp-generator";
import { generate_hash } from "./hash_utils";
import { Otp, Target } from "../../models/otp";

export const generateOtp = async (source: string, target: Target)=>{
    const otp = otpGenerator.generate(6,{specialChars: false, upperCaseAlphabets: false, lowerCaseAlphabets:false});
    const otp_code_hash = generate_hash(otp);
    const expiration_date = new Date(Date.now() + 10 * 60 * 1000);

    await new Otp({source, otp_code_hash, target, expiration_date}).save()

    return otp;
}


export const verifyOtp = async(source: string, otp: string)=>{
    // find the otp using source (can be more than one)

    // check for expiration

    // hash the otp

    // compare the otp hashes
}