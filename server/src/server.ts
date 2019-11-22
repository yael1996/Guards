import { app } from "./api/app";
import { config } from "dotenv";

config();
app.listen(process.env.PORT || 3000, () => { console.log(`Listening on port ${process.env.PORT}`) });
