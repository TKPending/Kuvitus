export const daysUntilCompletion = (targetDate: string): number => {
  const [day, month, year] = targetDate.split('/').map(Number);
  const target: Date = new Date(year, month - 1, day);
  const today: Date = new Date();

  const differenceMs: number = target.getTime() - today.getTime();

  const daysRemaining: number = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

  return daysRemaining;
};
