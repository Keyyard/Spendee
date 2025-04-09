import { transactionsUrl } from "./config";
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

export async function getAllTransactions(userId: string, page?: number) {
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

export async function getLimitTransactions(userId: string, limit?: number) {
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

export async function updateTransaction(
  userId: string,
  transactionId: string,
  data: object
) {
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

export async function getBudget(userId: string) {
  try {
    const response = await fetch(`${transactionsUrl}/budget?user_id=${userId}`, {
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
    console.error("Failed to fetch budget:", error);
    throw error;
  }
}