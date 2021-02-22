"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV_VAR = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.config();
const { ENV, PORT, } = process.env;
exports.ENV_VAR = {
    ENV,
    PORT,
};
