import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom_error";


export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(err instanceof CustomError){
        res.status(err.statusCode).json({error: err.serializeError()})
    }

    next(err);
}