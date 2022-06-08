import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRouter from './routes/authRouter.js';
import urlsRouter from './routes/urlsRouter.js';

const app = express().use(cors()).use(express.json());

app.use(authRouter);
app.use(urlsRouter);

app.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT);
});
