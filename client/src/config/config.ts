import { config } from "dotenv";

export interface Config {
    backendUri: string
}

config();

export default {
    backendUri: process.env.SERVER_URL
} as Config;