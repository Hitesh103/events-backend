import express from "express";
import bodyParser from "body-parser";
import dotenv, { config } from "dotenv";
import cors from 'cors'
import {connectDB} from "./database/db.js"

// Router
import eventRouter from "./Router/eventRouter.js";
import authRouter from "./Router/authRouter.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

dotenv.config();

config({
    path : "./database/config.env"
});


connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is Started at 4000` );
})

app.use('/event', eventRouter);
app.use('/auth', authRouter);
app.get('/', (req, res) => {
    res.send('Running . . .');
})    
