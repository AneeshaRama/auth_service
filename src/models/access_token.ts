import {Document, Schema, model} from "mongoose";

interface IAccessToken extends Document{
    user_id: Schema.Types.ObjectId,
    token_status: TokenStatus,
    expiration_date: Date
}

export enum TokenStatus{
    ACTIVE="ACTIVE",
    EXPIRED="EXPIRED",
    REVOKED="REVOKED"
}


const accessTokenSchema = new Schema<IAccessToken>({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "auth_user"
    },
    token_status:{
        type: String,
        enum: Object.values(TokenStatus),
        default: TokenStatus.ACTIVE
    },
    expiration_date:{
        type: Date,
        required: true
    }
}, {timestamps: true})


export const AccessToken = model<IAccessToken>("access_token", accessTokenSchema);