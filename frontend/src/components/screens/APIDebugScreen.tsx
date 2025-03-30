import { Text, TouchableOpacity } from "react-native";

export default function DebugPage( { user } : { user: any | null | undefined}) {
    return (
        <>
        <TouchableOpacity className="mt-4 px-6 py-2 bg-purple-500 rounded-lg" onPress={() => console.log("API TEST")}>
            <Text className="text-white font-medium">API TEST</Text>
        </TouchableOpacity>
        </>
    )
}
