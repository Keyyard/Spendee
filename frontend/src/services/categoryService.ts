import { categoriesUrl } from "./config";

export async function createCategory(userId: string, data: object) {
  try {
    const response = await fetch(`${categoriesUrl}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userId}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to create category:", error);
    throw error;
  }
}

export async function getAllCategories(userId: string) {
  try {
    const response = await fetch(`${categoriesUrl}/?user_id=${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch all categories:", error);
    throw error;
  }
}

export async function getCategory(userId: string, categoryId: string) {
  try {
    const response = await fetch(`${categoriesUrl}/${categoryId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch category:", error);
    throw error;
  }
}

export async function updateCategory(
  userId: string,
  categoryId: string,
  data: object
) {
  try {
    const response = await fetch(`${categoriesUrl}/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userId}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to update category:", error);
    throw error;
  }
}

export async function deleteCategory(userId: string, categoryId: string) {
  try {
    const response = await fetch(`${categoriesUrl}/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to delete category:", error);
    throw error;
  }
}