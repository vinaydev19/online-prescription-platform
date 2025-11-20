import dotenv from "dotenv"
import { app } from "./app.js";
import { connectDB } from "./db/connectDB.js";


dotenv.config({
    path: './env'
})

const port = process.env.PORT || 5000


connectDB().then(() => {
    app.on('error', (error) => {
        console.log(`express app failed to running ${error}`);
    })

    app.listen(port, () => {
        console.log(`express app running on port no ${port}`);
    })
}).catch((error) => {
    console.log(`db failed to connect ${error}`);
})