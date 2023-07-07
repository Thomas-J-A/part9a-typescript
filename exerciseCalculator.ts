import { isNotNumber } from './utils/isNotNumber.util';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgs = (args: string[]): number[] => {
  // Ensure target and at least one daily hours value are passed
  if (args.length < 4) throw new Error('Too few arguments');

  // Remove first two values (not arguments)
  const [, , ...strArgs] = args;

  // Ensure all arguments are numbers
  strArgs.forEach((arg) => {
    if (isNotNumber(arg)) {
      throw new Error('Arguments must be numbers');
    }
  });

  // Convert all arguments into numbers and return
  return strArgs.map((arg) => Number(arg));
};

const calculateExercises = (target: number, dailyHrs: number[]): Result => {
  const average =
    dailyHrs.reduce((prev, curr) => prev + curr, 0) / dailyHrs.length;
  const periodLength = dailyHrs.length;
  const trainingDays = dailyHrs.filter((i) => i !== 0).length;
  const success = average > target;

  const percentage = (average / target) * 100;
  let rating: number;
  let ratingDescription: string;
  switch (true) {
    case percentage < 50:
      rating = 1;
      ratingDescription = "You didn't do too well...";
      break;
    case percentage < 100:
      rating = 2;
      ratingDescription = 'Not too bad but you can do better';
      break;
    default:
      rating = 3;
      ratingDescription = 'You did very well!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const [target, ...dailyHours] = parseArgs(process.argv);
  console.log(calculateExercises(target, dailyHours));
} catch (err: unknown) {
  let errMsg = 'Something bad happened.';

  if (err instanceof Error) {
    errMsg = `${errMsg} Error: ${err.message}`;
  }

  console.log(errMsg);
}
