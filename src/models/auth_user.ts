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
        required: true
    },
    user_role:{
        type: String,
        enum: Object.values(UserRole),
        required: true
    },
    is_email_verified:{
        type: Boolean,
        required: true,
        default: false
    },
    is_mobile_verified:{
        type: Boolean,
        required: true,
        default: false
    },
    is_mfa_enabled:{
        type: Boolean,
        required: true,
        default: false
    },
    wrong_count:{
        type: Number,
        required: true,        
    },
    time_out:{
        type: Date,
        required: true,        
    },
    time_out_count:{
        type: Number,
        required: true,        
    },   
    account_status:{
        type: String,
        enum: Object.values(UserRole),
        required: true
    }, 
    is_deleted:{
        type: Boolean,
        required: true,
        default: false
    },
    delete_at:{
        type: Date,
        required: true,        
    },
}, {timestamps: true})


export const AuthUser = model<IAuthUser>("auth_user", userScehma);