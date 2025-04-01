import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { fetchBackendData } from "@/src/services/testServices";

export default function DebugPage() {
    const [apiResponse, setApiResponse] = useState<string | null>(null);
    const { user } = useUser();

    const handleApiTest = async () => {
        try {
            if (!user) return;
            const data = await fetchBackendData(user.id);
            console.log("API Response:", data);
            setApiResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("API Test failed:", error);
            setApiResponse("API Test failed. Check console for details.");
        }
    };

    return (
        <View>
            <TouchableOpacity
                className="mt-4 px-6 py-2 bg-purple-500 rounded-lg w-[100%]"
                onPress={handleApiTest}
            >
                <Text className="text-white font-medium text-center">API TEST</Text>
            </TouchableOpacity>
            <Text className="text-gray-800 font-semibold mt-4">API RESPONSE:</Text>
            <Text className="mt-2 text-gray-600 font-mono bg-gray-200 p-2 rounded">
                {apiResponse || "No response yet."}
            </Text>
        </View>
    );
}