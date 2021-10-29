import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDatabase, getFoodCollection } from './utils/database';

if (!process.env.MONGODB_URL) {
  throw new Error('No MongoDB URL dotenv variable');
}

const app = express();
const port = 3000;

// For parsing application/json
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello World!' + getFoodCollection);
});

// Post new food
app.post('/api/food', async (request, response) => {
  const foodCollection = getFoodCollection();
  const newFood = request.body;
  foodCollection.insertOne(newFood);
  response.send('new food added!');
});

// Connect to database
connectDatabase(process.env.MONGODB_URL).then(() =>
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
);
