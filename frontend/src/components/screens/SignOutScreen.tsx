import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function SignOutScreen() {
  return (
    <View className="w-80 p-6 bg-white rounded-lg shadow-md items-center">
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        Welcome to Spendee
      </Text>
      <Text className="text-gray-600 mb-6">Manage your expenses with ease</Text>

      <Link href="/(auth)/sign-in" asChild>
        <TouchableOpacity className="w-full bg-blue-600 py-3 rounded-lg mb-2">
          <Text className="text-white text-center font-semibold">Sign In</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/(auth)/sign-up" asChild>
        <TouchableOpacity className="w-full bg-gray-300 py-3 rounded-lg">
          <Text className="text-gray-800 text-center font-semibold">
            Sign Up
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
