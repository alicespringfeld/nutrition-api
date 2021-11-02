import express from 'express';
import { getFoodCollection } from './database';

const router = express.Router();

// Post new food
router.post('/api/food', async (request, response) => {
  const foodCollection = getFoodCollection();
  const newFood = request.body;
  foodCollection.insertOne(newFood);
  response.send('new food added!');
});

// Get a single food
router.get('/api/food/:name', async (request, response) => {
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

// Add field
router.patch('/api/food/:name', async (request, response) => {
  const foodCollection = getFoodCollection();
  const newField = request.body;
  const food = request.params.name;

  const updated = await foodCollection.updateOne(
    { name: food },
    { $set: newField }
  );
  if (updated.matchedCount === 0) {
    response.status(404).send('Food not found');
    return;
  }
  response.status(200).send('Field added');
});

// Get all food
router.get('/api/food/', async (_request, response) => {
  const foodCollection = getFoodCollection();
  const position = foodCollection.find();
  const allFoods = await position.toArray();
  response.send(allFoods);
});

// Delete food function
router.delete('/api/food/:name', async (request, response) => {
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
export default router;
