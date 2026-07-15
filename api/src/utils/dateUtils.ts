export function addDays(date: Date, amount: number): Date {
  const current = new Date(date.getTime());
  current.setUTCDate(current.getUTCDate() + amount);
  return current
}
