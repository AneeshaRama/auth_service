import { CustomError } from "./custom_error";


export class BadRequestError extends CustomError{
    statusCode = 400;
    constructor(message: string){
        super(message)
        Object.setPrototypeOf(this,BadRequestError.prototype)
    }

    serializeError(){
        return {
            message: this.message
        }
    }
}