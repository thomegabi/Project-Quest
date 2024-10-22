import bodyParser from 'body-parser';
import express from 'express'
import 'dotenv/config';
import dotenv from 'dotenv'
import userRoutes from './routes/user-routes'

dotenv.config()

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/', userRoutes)
