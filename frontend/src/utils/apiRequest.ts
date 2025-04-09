export async function apiRequest(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  userId: string,
  data?: object
) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userId}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to perform ${method} request:`, error);
    throw error;
  }
}
