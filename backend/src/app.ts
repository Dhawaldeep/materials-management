const express = require("express");
const cors = require("cors");
import { Request, Response } from "express";
import { json, urlencoded } from "body-parser";
import { join } from "path";

import materialRouter from "./materials.router";
import { ENV_VAR } from "./config/env";

const app = express();

app.use(json());
app.use(urlencoded({extended: true}));

if(ENV_VAR.ENV === 'development') app.use(cors());

app.use('/api', materialRouter);

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