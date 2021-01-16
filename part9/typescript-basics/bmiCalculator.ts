 export const calculateBmi = (height: number, weight: number): string => {
  const bmi = Number((weight/Math.pow(height/100, 2)).toFixed(1));
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.4 && bmi <= 24.9 ) {
    return 'Normal (healthy weight)';
  }
  return 'abnormal';
};

