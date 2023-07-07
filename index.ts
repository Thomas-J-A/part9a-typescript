import express = require('express');

import { calculateBmi } from './utils/calculateBmi.util';
import { isNotNumber } from './utils/isNotNumber.util';

const app = express();

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

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
