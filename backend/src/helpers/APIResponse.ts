import { OK } from "http-status";

export class APIResponse{
    constructor(private data?: any, private message?: string, private status?: number, private error?: any){
        this.data = data;
        this.message = message;
        this.status = status? status: OK;
        this.error = error;
    }
}