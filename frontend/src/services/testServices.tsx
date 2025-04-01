const API = process.env.EXPO_PUBLIC_API_URL;
const testUrl = `${API}/test/protected`;

export async function fetchBackendData(userId: string) {
    console.log(`Token being sent: Bearer ${userId}`);  // Log the token

    try {
        const response = await fetch(testUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userId}`,  // Ensure proper Authorization format
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
