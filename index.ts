import express = require('express');

import { calculateBmi } from './utils/calculateBmi.util';
import { calculateExercises } from './utils/calculateExercises.util';
import { isNotNumber } from './utils/isNotNumber.util';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;

  // Ensure weight and height exist
  if (!weight || !height) {
    return res
      .status(400)
      .json({ error: 'Weight and height values are required' });
  }

  // Ensure weight and height are numbers
  if (isNotNumber(weight) || isNotNumber(height)) {
    return res
      .status(400)
      .json({ error: 'Weight and height values must be numbers' });
  }

  // Calculate BMI
  const message = calculateBmi(Number(height), Number(weight));

  return res.status(200).json({ weight, height, bmi: message });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  // Ensure required values exist
  if (!target || !daily_exercises) {
    return res.status(400).json({ error: 'Parameters missing' });
  }

  // Ensure target is a number
  if (isNotNumber(target)) {
    return res.status(400).json({ error: 'Malformatted parameters' });
  }

  // Ensure daily_exercises is an array
  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: 'Malformatted parameters' });
  }

  // Ensure daily_exercises contains only numbers (as string type)
  if (daily_exercises.some((x) => isNotNumber(x))) {
    return res.status(400).json({ error: 'Malformatted parameters' });
  }

  // Convert array of string types into number types
  const dailyExercises = daily_exercises.map((x) => Number(x));

  const resultObj = calculateExercises(Number(target), dailyExercises);

  return res.status(200).json(resultObj);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
