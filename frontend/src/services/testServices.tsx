const API = process.env.EXPO_PUBLIC_API_URL;

const testUrl = `${API}/test`;

export async function fetchBackendData(userId: string) {
    console.log(`Token being sent: Bearer ${userId}`); // Log the token

    try {
        const response = await fetch(`${testUrl}/protected`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userId}`, // Ensure proper Authorization format
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch data from backend:", error);
        throw error;
    }
}

export async function fetchLimitedRoute() {
    try {
        const response = await fetch(`${testUrl}/limited`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch limited route:", error);
        throw error;
    }
}

export async function fetchPublicRoute() {
    try {
        const response = await fetch(`${testUrl}/public`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch public route:", error);
        throw error;
    }
}


const categoriesUrl = `${API}/categories`;

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
    const response = await fetch(`${categoriesUrl}/`, {
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

export async function updateCategory(userId: string, categoryId: string, data: object) {
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

const transactionsUrl = `${API}/transactions`;

export async function createTransaction(userId: string, data: object) {
    try {
        const response = await fetch(`${transactionsUrl}/`, {
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
        console.error("Failed to create transaction:", error);
        throw error;
    }
}

export async function getAllTransactions(userId: string) {
    try {
        const response = await fetch(`${transactionsUrl}/?user_id=${userId}`, {
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
        console.error("Failed to fetch all transactions:", error);
        throw error;
    }
}

export async function getTransaction(userId: string, transactionId: string) {
    try {
        const response = await fetch(`${transactionsUrl}/${transactionId}`, {
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
        console.error("Failed to fetch transaction:", error);
        throw error;
    }
}

export async function updateTransaction(userId: string, transactionId: string, data: object) {
    try {
        const response = await fetch(`${transactionsUrl}/${transactionId}`, {
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
        console.error("Failed to update transaction:", error);
        throw error;
    }
}

export async function deleteTransaction(userId: string, transactionId: string) {
    try {
        const response = await fetch(`${transactionsUrl}/${transactionId}`, {
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
        console.error("Failed to delete transaction:", error);
        throw error;
    }
}