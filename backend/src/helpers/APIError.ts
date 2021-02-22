import { INTERNAL_SERVER_ERROR } from "http-status";

export class APIError extends Error{
    constructor(message: string, private status: number = INTERNAL_SERVER_ERROR, private data: any = {}){
        super();
        this.message = message;
        this.status = status;
        this.data = data;
        Error.captureStackTrace(this)
    }
}