import { calculateExercises } from './utils/calculateExercises.util';
import { isNotNumber } from './utils/isNotNumber.util';

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
