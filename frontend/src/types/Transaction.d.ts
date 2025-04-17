export type Transaction = {
  id?: string;
  description: string;
  amount: number;
  type: string; // "income" | "expense"
  category?: string;
  date: string;
  categoryId?: string;
  userId?: string;
};
