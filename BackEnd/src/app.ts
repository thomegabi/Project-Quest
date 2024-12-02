import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import 'dotenv/config';
import express from 'express';
import characterRoutes from './routes/character-routes';
import userRoutes from './routes/user-routes';
import questRoutes from './routes/quest-routes';

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
app.use('/', characterRoutes);
app.use('/', questRoutes);
