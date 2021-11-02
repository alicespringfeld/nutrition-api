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

// Get a single food
app.get('/api/food/:name', async (request, response) => {
  const foodCollection = getFoodCollection();
  const singleFood = request.params.name;

  const isFoodKnown = await foodCollection.findOne({
    name: singleFood,
  });
  if (isFoodKnown) {
    response.status(200).send(isFoodKnown);
  } else {
    response
      .status(404)
      .send('This food doesn’t exist on earth 🌎 Check another planet. ');
  }
});

// Get all food
app.get('/api/food/', async (_request, response) => {
  const foodCollection = getFoodCollection();
  const position = foodCollection.find();
  const allFoods = await position.toArray();
  response.send(allFoods);
});

// Delete food functio
app.delete('/api/food/:name', async (request, response) => {
  const foodCollection = getFoodCollection();
  const singleFood = request.params.name;

  const isFoodKnown = await foodCollection.findOne({
    name: singleFood,
  });
  if (isFoodKnown) {
    foodCollection.deleteOne({ name: singleFood });
    response.status(200).send('Mhhh, yummy. Food deleted 🍢.');
  } else {
    response
      .status(404)
      .send('This food doesn’t exist on earth 🌎 Delete an other food. ');
  }
});

// Connect to database
connectDatabase(process.env.MONGODB_URL).then(() =>
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
);
