import { ArrowLeft } from "lucide-react-native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link, useRouter, Stack } from "expo-router";
export default function BackHeader({ headerTitle = "" }) {
    const router = useRouter();
    return (
        <Stack.Screen
            options={{
                headerTitle: headerTitle,
                headerTitleAlign: "center",
                headerShadowVisible: false, 
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()} className="ml-4">
                        <ArrowLeft size={24} color="black" />
                    </TouchableOpacity>
                ),
            }}
        />
    );
}
