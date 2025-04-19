import { transactionsUrl } from "./config";
import { apiRequest } from "@/src/utils/apiRequest";

export async function createTransaction(userId: string, data: object) {
  return apiRequest(`${transactionsUrl}/`, "POST", userId, data);
}

export async function getAllTransactions(userId: string, page?: number) {
  const url = `${transactionsUrl}/?userId=${userId}${page ? `&page=${page}` : ""}`;
  return apiRequest(url, "GET", userId);
}

export async function getLimitTransactions(userId: string, limit?: number) {
  const url = `${transactionsUrl}/?userId=${userId}${limit ? `&limit=${limit}` : ""}`;
  return apiRequest(url, "GET", userId);
}

export async function getTransaction(userId: string, transactionId: string) {
  const url = `${transactionsUrl}/${transactionId}`;
  return apiRequest(url, "GET", userId);
}

export async function updateTransaction(
  userId: string,
  transactionId: string,
  data: {
    amount: number;
    categoryId: string;
    description?: string;
    date?: string;
  }
) {
  if (!data.amount || typeof data.amount !== "number") {
    throw new Error("Invalid or missing 'amount'. It must be a number.");
  }
  if (!data.categoryId || typeof data.categoryId !== "string") {
    throw new Error("Invalid or missing 'categoryId'. It must be a string.");
  }

  const url = `${transactionsUrl}/${transactionId}`;
  return apiRequest(url, "PUT", userId, data);
}

export async function deleteTransaction(userId: string, transactionId: string) {
  const url = `${transactionsUrl}/${transactionId}`;
  return apiRequest(url, "DELETE", userId);
}

export async function getBudget(userId: string) {
  const url = `${transactionsUrl}/budget?userId=${userId}`;
  return apiRequest(url, "GET", userId);
}