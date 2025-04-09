import Welcome from "@/src/components/screens/home/Welcome";
import BudgetScreen from "@/src/components/screens/home/BudgetScreen";
import RecentTransactions from "@/src/components/transactions/RecentTransactions";
import { useUser } from "@clerk/clerk-expo";
import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();

  if (!user) {
    return <View className="flex-1 items-center justify-center"><Text>Loading...</Text></View>;
  }

  return (
    <View className="flex-1 p-4 bg-background">
      <Welcome user={user} />
      <BudgetScreen user={user} />
      <RecentTransactions user={user}  />
    </View>
  );
}
