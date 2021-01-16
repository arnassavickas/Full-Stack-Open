import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
import { Request } from 'express';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

interface BMI {
  target: number;
  daily_exercises: Array<number>;
}

app.post('/exercises', (req: Request<unknown, unknown, BMI>, res) => {
  const target: number = req.body.target;
  const dailyExercises: Array<number> = req.body.daily_exercises;

  if (!target || !dailyExercises) {
    res
      .status(400)
      .send({
        error: 'parameters missing',
      })
      .end();
  }

  if (
    isNaN(Number(target)) ||
    dailyExercises.find((el: number) => isNaN(Number(el))) !== undefined
  ) {
    res
      .status(400)
      .send({
        error: 'malformatted parameters',
      })
      .end();
  }
  const results = exerciseCalculator(dailyExercises, target);
  res.status(200).send(results).end();
});

app.get('/bmi', (req, res) => {
  if (
    !req.query.weight ||
    !req.query.height ||
    isNaN(Number(req.query.weight)) ||
    isNaN(Number(req.query.height))
  ) {
    res.send({
      error: 'malformatted parameters',
    });
  }

  res.send({
    height: req.query.height,
    weight: req.query.weight,
    bmi: calculateBmi(Number(req.query.height), Number(req.query.weight)),
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log('server running on port', PORT);
});
