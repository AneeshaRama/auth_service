import {Document, Schema, model} from "mongoose";
import { TokenStatus } from "./access_token";

interface IRefreshToken extends Document{
    user_id: Schema.Types.ObjectId,
    token_status: TokenStatus,
    count: number,
    expiration_date: Date
}

const refreshTokenSchema = new Schema<IRefreshToken>({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "auth_user"
    },
    token_status:{
        type: String,
        enum: Object.values(TokenStatus),
        default: TokenStatus.ACTIVE
    },
    count:{
        type: Number,
        default: 1
    },
    expiration_date:{
        type: Date,
        required: true
    }
}, {timestamps: true})


export const RefreshToken = model<IRefreshToken>("refresh_token", refreshTokenSchema);