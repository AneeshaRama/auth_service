import { Request, Response } from "express";
import { AuthUser } from "../../models/auth_user";
import { BadRequestError } from "../../errors/bad_request_error";
import { generate_hash } from "../../utils/auth/hash_utils";
import {  sendOtp } from "../../utils/auth/otp_utils";

export const register = async(req: Request, res: Response) => {

    // Assumption: The input validations done in client side like null check and regex patterns. 
    const {first_name, last_name, username, phone_number, email, password} = req.body;    
    await isUserAlreadyExists(username, phone_number, email);
    const hashed_password = await generate_hash(password) ;
    const newAuthUser = await new AuthUser({first_name, last_name, username, phone_number, email, password_hash: hashed_password}).save()
    const message = await sendOtp(phone_number, email);
    res.status(200).json({message, user_id: newAuthUser.id})
}


const isUserAlreadyExists = async(username: string, phone_number: string, email: string) => {
    if(username !== null){
        const user = await AuthUser.findOne({username});
        if(user !== null){
            throw new BadRequestError(`User with username ${username} already exist.`)
        }
    }
    if(phone_number !== null){
        const user = await AuthUser.findOne({phone_number});
        if(user !== null){
            throw new BadRequestError(`This phone number is already in use.`)
        }
    }
    if(email !== null){
        const user = await AuthUser.findOne({email});
        if(user !== null){
            throw new BadRequestError(`This email address is already in use.`)
        }
    }
}