import express = require('express');
import { bmiCalculator } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  try{
    res.send(bmiCalculator(height,weight));
  }catch{
    res.status(400).send({
      error: "malformatted parameters"
    });

  }
  
 
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});