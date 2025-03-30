import Welcome from "@/src/components/screens/Welcome";
import BudgetScreen from "@/src/components/screens/BudgetScreen";
import { useUser } from "@clerk/clerk-expo";
import { View } from "react-native";
import { Stack } from "expo-router";
export default function Page() {
  const { user } = useUser();

  return (
    <View className="flex-1 items-start justify-start p-4">
      <Welcome user={user} />
      <BudgetScreen user={user} />
    </View>
  );
}
