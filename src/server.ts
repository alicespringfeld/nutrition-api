import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDatabase, getUserCollection } from './utils/database';

if (!process.env.MONGODB_URI) {
  throw new Error('No MongoDB URL dotenv variable');
}

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.send('Hello World!' + getUserCollection);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Connect to database
connectDatabase(process.env.MONGODB_URI).then(() =>
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
);
