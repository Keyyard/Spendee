import AllTransactions from "@/src/components/transactions/AllTransactions";
import React from "react";
import { View, Text } from "react-native";
import { useUser } from "@clerk/clerk-expo";

export default function History() {
  const { user } = useUser();
  
    if (!user) {
      return <View className="flex-1 items-center justify-center"><Text>Loading...</Text></View>;
    }

  return (
    <View className="flex-1 bg-background p-4">
    <AllTransactions user={user} />
    </View>
  );
}