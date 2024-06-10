export const daysUntilCompletion = (targetDate: string): number => {
  const [targetDay, targetMonth, targetYear] = targetDate.split('/').map(Number);
  const target: Date = new Date(targetYear, targetMonth - 1, targetDay);
  const today: Date = new Date();

  const differenceMs: number = target.getTime() - today.getTime();
  const daysRemaining: number = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

  return daysRemaining;
};
