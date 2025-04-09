import SettingsScreen from "@/src/components/screens/settings/SettingsScreen";
import CategoryManagement from "@/src/components/screens/settings/CategoryManagement";
import { useUser } from "@clerk/clerk-expo";
import { View, Text } from "react-native";
import { Stack } from "expo-router";

export default function Page() {
  const { user } = useUser();

  if (!user) {
    return <View className="flex-1 items-center justify-center"><Text>Loading...</Text></View>;
  }

  return (
    <View className="flex-1 p-4 bg-background">
      <View className="justify-start items-start">
        <SettingsScreen user={user} />
      </View>
      <View className="mt-4">
        <CategoryManagement user={user} />
      </View>
    </View>
  );
}
