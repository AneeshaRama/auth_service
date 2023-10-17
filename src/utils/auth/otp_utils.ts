import otpGenerator from "otp-generator";
import { compare_hash, generate_hash } from "./hash_utils";
import { Otp, Target } from "../../models/otp";
import { BadRequestError } from "../../errors/bad_request_error";
import { sendMessage } from "../notifications/sns";

const generateOtp = async (source: string, target: Target)=>{
    const otp = otpGenerator.generate(6,{specialChars: false, upperCaseAlphabets: false, lowerCaseAlphabets:false});
    const otp_code_hash = await generate_hash(otp);
    const expiration_date = new Date(Date.now() + 10 * 60 * 1000);

    await new Otp({source, otp_code_hash, target, expiration_date}).save()

    return otp;
}


export const verifyOtp = async(source: string, otp_code: string)=>{
  
    const otps = await Otp.find({source});
    if(!otps){
        throw new BadRequestError("OOPS..Something went wrong. Please try again");
    }
  
    if(otps.length > 0){
        for(const otp of otps){
            if(otp.expiration_date > new Date()){
                if(await compare_hash(otp_code, otp.otp_code_hash)){
                    return true;                    
                }
            }
        }
    }
    
    throw new BadRequestError("Fatal error: Invalid OTP");
   
}


export const sendOtp = async(phone_number: string, email: string) => {
    if(phone_number !== null){
        const otp = await generateOtp(phone_number, Target.MOBILE);
        await sendMessage(phone_number, otp);
        return "OTP has been successfully sent to your phone number."
    }
    if(email!== null){
       // Implemnt the logic


        return "OTP has been successfully sent to your phone number."
    }
}