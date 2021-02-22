"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
const http_status_1 = require("http-status");
class APIError extends Error {
    constructor(message, status = http_status_1.INTERNAL_SERVER_ERROR, data = {}) {
        super();
        this.status = status;
        this.data = data;
        this.message = message;
        this.status = status;
        this.data = data;
        Error.captureStackTrace(this);
    }
}
exports.APIError = APIError;
