const calculateBmi = (heightCm: number, weight: number): string => {
  // Convert height from cm to m
  const heightM = heightCm / 100;

  // Calculate BMI
  const bmi = weight / heightM ** 2;

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

console.log(calculateBmi(180, 74));
