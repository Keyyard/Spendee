import Welcome from "@/src/components/organisms/home/Welcome";
import Budget from "@/src/components/organisms/home/Budget";
import RecentTransactions from "@/src/components/organisms/transactions/RecentTransactions";
import { useUser } from "@clerk/clerk-expo";
import { View, Text } from "react-native";
import { Card } from "@/src/components/atoms";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useUserContext } from "@/src/hooks/useUserContext";

export default function Home() {
  const { user } = useUserContext();
  if (!user) {
    return <View className="flex-1 items-center justify-center"><Text>Loading...</Text></View>;
  }

  return (
    <Card className="flex-1 p-4 bg-background">
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
    </Card>
  );
}
