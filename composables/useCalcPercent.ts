export const useCalcPercent = (value: number, maxValue: number): number => {
  return Math.round((value / maxValue) * 100)
}