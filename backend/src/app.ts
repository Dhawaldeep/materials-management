const express = require("express");
const cors = require("cors");
import { Request, Response } from "express";
import { json, urlencoded } from "body-parser";
import { join } from "path";

// import * as swagger from "swagger-jsdoc";
import swaggerJSDoc = require("swagger-jsdoc");
// import swaggerUI = require("swagger-ui-express");
import swaggerUI from "swagger-ui-express";
// import * as swaggerJSDoc  from 'swagger-jsdoc';

import materialRouter from "./materials.router";
import { ENV_VAR } from "./config/env";

const app = express();

app.use(json());
app.use(urlencoded({extended: true}));

if(ENV_VAR.ENV === 'development') app.use(cors());

app.use('/api', materialRouter);

const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
        info: {
            title: 'Material Management Rest API', // Title (required)
            version: '0.0.0', // Version (required)
        },
        basePath: '/api',
        tags: [
            {
                name: 'Material',
                description: 'Handles saving, updation, deletion and operations of material'
            },
        ]
    },
    apis: [join(require.main?.path!, `materials.router${ENV_VAR.ENV == 'development'?'.ts':'.js'}`)]
})

app.use('/api/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.use('/custom', express.static(join(require.main?.path!, '..', 'public')));

app.get('/custom', (_: Request, res: Response)=>{
    res.sendFile(join(require.main?.path!, '..', 'public', 'index.html'))
})

app.use('/', express.static(join(require.main?.path!, '..', 'angular')));

app.get('/', (_: Request, res: Response)=>{
    res.sendFile(join(require.main?.path!, '..', 'angular', 'index.html'))
})

app.get('/*',  (_: Request, res: Response)=>{
    res.redirect('/');
})

app.listen(ENV_VAR.PORT, ()=>{
    console.log(`RUNNING ON PORT ${ENV_VAR.PORT}`)
});