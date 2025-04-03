import SettingsScreen from "@/src/components/screens/SettingsScreen";
import APIDebugScreen from "@/src/components/screens/APIDebugScreen";
import CategoryManagement from "@/src/components/screens/CategoryManagement";
import { useUser } from "@clerk/clerk-expo";
import { View } from "react-native";
import { Stack } from "expo-router";

export default function Page() {
  const { user } = useUser();

  return (
    <View className="flex-1 p-4 bg-background">
      <View className="justify-start items-start">
        <SettingsScreen user={user} />
      </View>
      <View className="mt-4">
        <APIDebugScreen />
      </View>
      <View className="mt-4">
        <CategoryManagement user={user} />
      </View>
    </View>
  );
}
