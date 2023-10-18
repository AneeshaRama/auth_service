import {Document, ObjectId, Schema, model} from "mongoose";

interface IOtp extends Document{
    user_id: ObjectId,
    otp_code_hash: string,
    target: Target,
    expiration_date: Date
}


export enum Target{
    EMAIL="EMAIL",
    MOBILE="MOBILE"
}


const otpSchema = new Schema<IOtp>({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "auth_user"
    },
    otp_code_hash:{
        type: String,
        required: true
    },
    target:{
        type: String,
        enum: Object.values(Target),
        required: true
    },
    expiration_date:{
        type: Date,
        required: true
    },
}, {timestamps: true})


export const Otp = model<IOtp>("otp", otpSchema);