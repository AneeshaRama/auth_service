import express, { Request, Response } from "express";
import dotenv from "dotenv";
import "express-async-errors"
import { connectToDatabase } from "./connect_db";
import {json} from "body-parser"
import cors from "cors";
import authroute from "../routes/authroute"
import { errorHandler } from "../middlewares/error_handler";

const app = express();
dotenv.config();

export const startServer = async ()=>{

    await connectToDatabase();

    app.use(cors())
    app.use(json())

    app.use("/api", authroute);
    app.all("*", async(req: Request, res: Response)=>{
        res.status(404).json({error: "Path not found"})
    })

    app.use(errorHandler);

    const port = process.env.PORT!;
    app.listen(port, ()=>{
        console.log(`🚀🚀 Server is running on port: ${port}  🚀🚀`)
    })

}

