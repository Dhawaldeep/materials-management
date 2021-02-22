"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const body_parser_1 = require("body-parser");
const path_1 = require("path");
const materials_router_1 = __importDefault(require("./materials.router"));
const env_1 = require("./config/env");
const app = express();
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: true }));
if (env_1.ENV_VAR.ENV === 'development')
    app.use(cors());
app.use('/api', materials_router_1.default);
app.use('/custom', express.static(path_1.join((_a = require.main) === null || _a === void 0 ? void 0 : _a.path, '..', 'public')));
app.get('/custom', (_, res) => {
    var _a;
    res.sendFile(path_1.join((_a = require.main) === null || _a === void 0 ? void 0 : _a.path, '..', 'public', 'index.html'));
});
app.use('/', express.static(path_1.join((_b = require.main) === null || _b === void 0 ? void 0 : _b.path, '..', 'angular')));
app.get('/', (_, res) => {
    var _a;
    res.sendFile(path_1.join((_a = require.main) === null || _a === void 0 ? void 0 : _a.path, '..', 'angular', 'index.html'));
});
app.get('/*', (_, res) => {
    res.redirect('/');
});
app.listen(env_1.ENV_VAR.PORT, () => {
    console.log(`RUNNING ON PORT ${env_1.ENV_VAR.PORT}`);
});
