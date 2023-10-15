import jwt from "jsonwebtoken";
import { AccessToken, TokenStatus } from "../../models/access_token";
import { ObjectId } from "mongoose";
import { RefreshToken } from "../../models/refresh_token";

export const generate_access_token = (id: ObjectId, role: string)=>{
    const token = jwt.sign({user_id: id, user_role: role}, process.env.JWT_SECRET_KEY!, {expiresIn: "3m"});
    const expiration_date = new Date(Date.now() + 10 * 60 * 1000);

    return new AccessToken({user_id: id, token, expiration_date, token_status: TokenStatus.ACTIVE}).save()
}


export const generate_refresh_token = (id: ObjectId, role: string)=>{
    const token = jwt.sign({user_id: id, user_role: role}, process.env.JWT_SECRET_KEY!, {expiresIn: "3d"});
    const expiration_date = new Date(new Date().setDate(new Date().getDate() + 1));

    return new RefreshToken({user_id: id, token, expiration_date, token_status: TokenStatus.ACTIVE}).save()
}