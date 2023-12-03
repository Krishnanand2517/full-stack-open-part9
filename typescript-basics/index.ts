import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { isNotNumber } from "./isNotNumber";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.json({
      error: "malformatted parameters",
    });
  } else {
    const bmiResult = calculateBmi(height, weight);

    return res.json({
      weight,
      height,
      bmi: bmiResult,
    });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, target } = req.body;

  if (!dailyExercises || !target) {
    return res.json({
      error: "parameters missing",
    });
  } else if (
    !Array.isArray(dailyExercises) ||
    dailyExercises.some(isNotNumber) ||
    isNotNumber(target)
  ) {
    return res.json({
      error: "malformatted parameters",
    });
  }

  const result = calculateExercises(dailyExercises as number[], Number(target));

  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
