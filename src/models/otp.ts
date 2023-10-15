import {Document, Schema, model} from "mongoose";

interface IOtp extends Document{
    user_id: Schema.Types.ObjectId,
    otp_code_hash: string,
    otp_status: OtpStatus,
    target: Target,
    expiration_date: Date
    delete_at: Date
}

enum OtpStatus{
    ACTIVE="ACTIVE",
    EXPIRED="EXPIRED"
}

enum Target{
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
    otp_status:{
        type: String,
        enum: Object.values(OtpStatus),
        default: OtpStatus.ACTIVE
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
    delete_at:{
        type: Date,
        required: true
    }
}, {timestamps: true})


export const Otp = model<IOtp>("otp", otpSchema);