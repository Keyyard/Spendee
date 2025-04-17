import { categoriesUrl } from "./config";
import { apiRequest } from "@/src/utils/apiRequest";

export async function createCategory(userId: string, data: object) {
  return apiRequest(`${categoriesUrl}/`, "POST", userId, data);
}

export async function getAllCategories(userId: string) {
  const url = `${categoriesUrl}/?userId=${userId}`;
  return apiRequest(url, "GET", userId);
}

export async function getCategory(userId: string, categoryId: string) {
  const url = `${categoriesUrl}/${categoryId}`;
  return apiRequest(url, "GET", userId);
}

export async function updateCategory(
  userId: string,
  categoryId: string,
  data: object
) {
  const url = `${categoriesUrl}/${categoryId}`;
  return apiRequest(url, "PUT", userId, data);
}

export async function deleteCategory(userId: string, categoryId: string) {
  const url = `${categoriesUrl}/${categoryId}`;
  return apiRequest(url, "DELETE", userId);
}