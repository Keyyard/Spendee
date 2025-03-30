import SettingsScreen from "@/src/components/screens/SettingsScreen";
import APIDebugScreen from "@/src/components/screens/APIDebugScreen";
import { useUser } from "@clerk/clerk-expo";
import { View } from "react-native";
import { Stack } from "expo-router";
export default function Page() {
  const { user } = useUser();

  return (
    <View className="flex-1 p-4 justify-start items-start bg-gray-100">
      <SettingsScreen user={user} />
      <APIDebugScreen user={user} />
    </View>
  );
}
