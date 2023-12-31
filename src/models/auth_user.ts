import {Document, Schema, model} from "mongoose";

interface IAuthUser extends Document{
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password_hash: string,
    auth_type: AuthType,
    user_role: UserRole,
    is_email_verified: boolean,
    is_mobile_verified: boolean,
    is_mfa_enabled: boolean,    
    account_status: AccountStatus,
    wrong_count: number,
    time_out: Date,
    time_out_count: number,
    is_deleted: boolean,
    delete_at: Date   
}

enum AuthType{
    USERNAME_PASSWORD="USERNAME_PASSWORD",
    EMAIL="EMAIL", 
    MOBILE="MOBILE", 
    SOCIAL_MEDIA="SOCIAL_MEDIA"
}

enum UserRole{
    ROOT="ROOT", 
    ADMIN="ADMIN",
     USER="USER"
}

enum AccountStatus{
    ACTIVE="ACTIVE",
    BANNED="BANNED",
    BLOCKED="BLOCKED"
}


const userScehma = new Schema<IAuthUser>({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password_hash:{
        type: String,
        required: true
    },    
    auth_type:{
        type: String,
        enum: Object.values(AuthType),
    },
    user_role:{
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER
    },
    is_email_verified:{
        type: Boolean,
        default: false
    },
    is_mobile_verified:{
        type: Boolean,
        default: false
    },
    is_mfa_enabled:{
        type: Boolean,
        default: false
    },
    wrong_count:{
        type: Number, 
        default: 0      
    },
    time_out:{
        type: Date,    
    },
    time_out_count:{
        type: Number,
        default: 0
    },   
    account_status:{
        type: String,
        enum: Object.values(AccountStatus),
        default: AccountStatus.ACTIVE
    }, 
    is_deleted:{
        type: Boolean,
        default: false
    },
    delete_at:{
        type: Date,
    },
}, {timestamps: true})


export const AuthUser = model<IAuthUser>("auth_user", userScehma);