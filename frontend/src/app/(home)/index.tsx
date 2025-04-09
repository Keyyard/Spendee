import Welcome from "@/src/components/screens/home/Welcome";
import Budget from "@/src/components/screens/home/Budget";
import RecentTransactions from "@/src/components/transactions/RecentTransactions";
import { useUser } from "@clerk/clerk-expo";
import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useUserContext } from "@/src/context/userContext";

export default function Home() {
  const { user } = useUserContext();
  if (!user) {
    return <View className="flex-1 items-center justify-center"><Text>Loading...</Text></View>;
  }

  return (
    <View className="flex-1 p-4 bg-background">
      <Welcome user={user} />
      <Budget user={user} />
      <RecentTransactions user={user}  />
    </View>
  );
}
