/**
 * Calculates the value after applying a percentage.
 * @param amount - The original amount.
 * @param percentage - The percentage to be applied.
 * @returns The calculated value.
 */
export const calculatePercentage = (
  amount: number,
  percentage: number,
): number => {
  return amount - amount * (percentage / 100);
};
