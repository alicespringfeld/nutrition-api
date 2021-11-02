import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDatabase, getFoodCollection } from './utils/database';
import router from './utils/router';
if (!process.env.MONGODB_URL) {
  throw new Error('No MongoDB URL dotenv variable');
}

const app = express();
const port = 3000;

// For parsing application/json
app.use(express.json());

app.use(router);

app.get('/', (_req, res) => {
  res.send('Hello World!' + getFoodCollection);
});

// Connect to database
connectDatabase(process.env.MONGODB_URL).then(() =>
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
);
