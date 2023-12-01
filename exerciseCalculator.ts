import { isNotNumber } from "./isNotNumber";

interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

interface ExerciseParams {
  target: number;
  dailyHours: number[];
}

const parseArguments = (args: string[]): ExerciseParams => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const isValidArgs: boolean = args.slice(2).every((arg) => !isNotNumber(arg));

  if (isValidArgs) {
    return {
      target: Number(args[2]),
      dailyHours: args.slice(3).map((arg) => Number(arg)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateExercises = (
  dailyHours: number[],
  targetHours: number
): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((hours) => hours > 0).length;
  const target = targetHours;

  const average = +(
    dailyHours.reduce((sum, hours) => sum + hours, 0) / periodLength
  ).toFixed(2);

  const success = average >= target;
  const rating = success ? 3 : average >= target / 2 ? 2 : 1;

  const ratingDescription =
    rating === 1
      ? "Lot of improvement needed!"
      : rating === 2
      ? "Not bad... but try to improve!"
      : rating === 3
      ? "Nice work! Keep it up."
      : "invalid rating value";

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
};

try {
  const { target, dailyHours } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
