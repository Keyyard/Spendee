
export function toDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function isFutureDate(dateString: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cellDate = new Date(dateString);
  cellDate.setHours(0, 0, 0, 0);
  return cellDate > today;
}

export function groupTransactionsByDate(transactions: any[]): Record<string, { income: number; expense: number; transactions: any[] }> {
  const map: Record<string, { income: number; expense: number; transactions: any[] }> = {};
  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = toDateString(date);
    if (!map[key]) map[key] = { income: 0, expense: 0, transactions: [] };
    if (t.type === "income") map[key].income += t.amount;
    if (t.type === "expense") map[key].expense += t.amount;
    map[key].transactions.push(t);
  });
  return map;
}
