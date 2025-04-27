import Welcome from "@/src/components/features/home/Welcome";
import Budget from "@/src/components/features/home/Budget";
import RecentTransactions from "@/src/components/transactions/RecentTransactions";
import { useUser } from "@clerk/clerk-expo";
import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useUserContext } from "@/src/hooks/useUserContext";

export default function Home() {
  const { user } = useUserContext();
  if (!user) {
    return <View className="flex-1 items-center justify-center"><Text>Loading...</Text></View>;
  }

  return (
    <View className="flex-1 p-4 bg-background">
      <Stack.Screen
        options={{
          headerTitle: "Home",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#f8f8f8",
          },
          headerTintColor: "#333",
        }}
      />
      <Welcome user={user} />
      <Budget user={user} />
      <RecentTransactions  />
    </View>
  );
}
