
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

const app = express();

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());

export default app;
