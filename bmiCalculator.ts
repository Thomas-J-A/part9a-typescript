import { isNotNumber } from './utils/isNotNumber.util';

interface heightAndWeight {
  height: number;
  weight: number;
}

const parseArgs = (args: string[]): heightAndWeight => {
  // Ensure two values were passed on command line
  if (args.length < 4) throw new Error('Too few arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  // Ensure both values are of type number
  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error('Arguments must be numbers');
  }

  return { height: Number(args[2]), weight: Number(args[3]) };
};

const calculateBmi = (heightCm: number, weightKg: number): string => {
  // Convert height from cm to m
  const heightM = heightCm / 100;

  // Calculate BMI
  const bmi = weightKg / heightM ** 2;

  let message: string;

  switch (true) {
    case bmi < 18.5:
      message = 'Underweight';
      break;
    case bmi < 24.9:
      message = 'Normal (healthy weight)';
      break;
    case bmi < 29.9:
      message = 'Overweight';
      break;
    default:
      message = 'Obese';
  }

  return message;
};

try {
  const { height, weight } = parseArgs(process.argv);
  console.log(calculateBmi(height, weight));
} catch (err: unknown) {
  let errMsg = 'Something bad happened.';

  if (err instanceof Error) {
    errMsg = `${errMsg} Error: ${err.message}`;
  }

  console.log(errMsg);
}
