// Incorrect Days
export const daysUntilCompletion = (targetDate: string): number => {
  const target: Date = new Date(targetDate);
  const today: Date = new Date();

  const differenceMs: number = target.getTime() - today.getTime();

  const daysRemaining: number = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

  return daysRemaining;
};
