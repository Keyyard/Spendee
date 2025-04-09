import CategoryManagement from "@/src/components/screens/settings/CategoryManagement";
import { useUser } from "@clerk/clerk-expo";
import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { SignOutButton } from "@/src/components/buttons/SignOutButton";
import CurrencySettings from "@/src/components/screens/settings/CurrencySettings";
import { useUserContext } from "@/src/context/userContext";

export default function Page() {
  const { user } = useUserContext();

  if (!user) {
    return <View className="flex-1 items-center justify-center"><Text>Loading...</Text></View>;
  }

  return (
    <View className="flex-1 p-4 bg-background">
      <View className="justify-start items-start">
        <Text className="text-xl font-semibold text-gray-800">
          Welcome, {user?.username}
        </Text>
        <SignOutButton />
      </View>
      <View className="mt-4">
        <CurrencySettings />
      </View>
      <View className="mt-4">
        <CategoryManagement user={user} />
      </View>
    </View>
  );
}
