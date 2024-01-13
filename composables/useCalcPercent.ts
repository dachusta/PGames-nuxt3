export const useCalcPercent = (value: number, maxValue: number): number => {
  if (maxValue === 0) {
    throw new Error('maxValue cannot be zero');
  }

  return Math.round((value / maxValue) * 100);
};