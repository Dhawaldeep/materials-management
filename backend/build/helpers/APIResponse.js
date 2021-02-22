"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIResponse = void 0;
const http_status_1 = require("http-status");
class APIResponse {
    constructor(data, message, status, error) {
        this.data = data;
        this.message = message;
        this.status = status;
        this.error = error;
        this.data = data;
        this.message = message;
        this.status = status ? status : http_status_1.OK;
        this.error = error;
    }
}
exports.APIResponse = APIResponse;
