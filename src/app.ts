import bodyParser from 'body-parser';
import express from 'express'

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
