interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHrs: number[], target: number): Result => {
  const average =
    dailyHrs.reduce((prev, curr) => prev + curr, 0) / dailyHrs.length;
  const periodLength = dailyHrs.length;
  const trainingDays = dailyHrs.filter((i) => i !== 0).length;
  const success = average > target;

  let percentage = (average / target) * 100;
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

const dailyHours = [3, 0, 2, 4.5, 0, 3, 1];
console.log(calculateExercises(dailyHours, 2));
