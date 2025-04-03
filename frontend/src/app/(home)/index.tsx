import Welcome from "@/src/components/screens/Welcome";
import BudgetScreen from "@/src/components/screens/BudgetScreen";
import RecentTransactions from "@/src/components/screens/RecentTransactions";
import { useUser } from "@clerk/clerk-expo";
import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function Page() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      console.warn("User object is not loaded yet.");
    }
  }, [user]);

  if (!user) {
    return <View className="flex-1 items-center justify-center"><Text>Loading...</Text></View>;
  }

  return (
    <View className="flex-1 p-4 bg-background">
      <Welcome user={user} />
      <BudgetScreen user={user} />
      <RecentTransactions />
    </View>
  );
}
