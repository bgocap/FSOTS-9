/* eslint-disable import/no-unresolved */
import express = require('express');
import { bmiCalculator } from './bmiCalculator';
import { isNotNumber } from './isNotNumber';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  try {
    res.send(bmiCalculator(height, weight));
  } catch {
    res.status(400).send({
      error: "malformatted parameters"
    });

  }


});

app.post('/exercises', (req, res) => {

  interface params {
    daily_exercises: number[];
    target: number;
  }

  const { daily_exercises, target } = req.body as params;

  if (!daily_exercises || !target) {
    res.status(400).send({
      error: "parameters missing"
    });
  }

  if (daily_exercises.map((arg) => isNotNumber(arg)).some((bol) => bol === true) || isNotNumber(target)) {
    res.status(400).send({
      error: "malformatted parameters"
    });
  }

  res.status(200).send(calculateExercises(target, daily_exercises));


});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});