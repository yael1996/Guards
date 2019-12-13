import { config } from "dotenv";

export interface Config {
    backendUri: string
}

config();

export default {
    backendUri: "http://localhost:4000"
} as Config;