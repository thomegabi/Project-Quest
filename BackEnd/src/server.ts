import dotenv from 'dotenv';
dotenv.config();
import { app } from "./app";

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});