interface ResultObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const exerciseCalculator = (data: Array<number>, target: number): ResultObject => {
  const periodLength = data.length;
  const trainingDays = data.reduce((sum, value) => {
    if (value > 0) {
      return sum + 1;
    } else {
      return sum;
    }
  }, 0);
  const average = data.reduce((sum, value) => sum + value, 0)/periodLength;
  const success = average >= target;
  const rating = () => {
    if (average - target < -1) {
      return 1;
    } else if (average - target < 0) {
      return 2;
    } else {
      return 3;
    }
  };
  const ratingDescription = () => {
    if (average - target < -1) {
      return 'nekazka...';
    } else if (average - target < 0) {
      return 'beveik';
    } else {
      return 'mldc';
    }
  };

  return {
    periodLength,
    trainingDays,
    success,
    rating: rating(),
    ratingDescription: ratingDescription(),
    target,
    average
  };
};
