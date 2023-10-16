import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./connect_db";
import {json} from "body-parser"
import cors from "cors";

const app = express();
dotenv.config();

export const startServer = async ()=>{

    await connectToDatabase();

    app.use(json())
    app.use(cors())

    const port = process.env.PORT!;
    app.listen(port, ()=>{
        console.log(`🚀🚀 Server is running on port: ${port}  🚀🚀`)
    })

}

