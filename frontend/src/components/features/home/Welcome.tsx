import { Text, View } from "react-native";
import type { User } from "@/src/types/User";

export default function Welcome({ user }: { user: User | null | undefined }) {
    return (
        <View>
            <Text className="text-xl font-semibold text-gray-800">
                Hi, {user?.username} 👋
            </Text>
            <Text className="text-lg text-gray-600 mt-2">
                Let's Spendee track for you.
            </Text>
        </View>
    );
}
