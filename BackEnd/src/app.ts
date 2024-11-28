import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';
import dotenv from 'dotenv';
import userRoutes from './routes/user-routes';
import { questRoutes } from './routes/quest-routes';
import cors from 'cors';

dotenv.config();

export const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', userRoutes);
app.use('/', questRoutes);