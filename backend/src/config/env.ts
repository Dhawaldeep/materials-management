import {config} from "dotenv";

config();

interface EnvVar {
    ENV: string,
    PORT: string,
}

const {
    ENV,
    PORT,
} = process.env as { [x: string]: string };

export const ENV_VAR: EnvVar = {
    ENV,
    PORT,
}
