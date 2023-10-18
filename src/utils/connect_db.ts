import {connect} from "mongoose";


export const connectToDatabase = async ()=>{
    await connect(process.env.MONGODB_URI!)
        .then(()=>{
            console.log(`Connected to DB 🖥️`);
        });
}