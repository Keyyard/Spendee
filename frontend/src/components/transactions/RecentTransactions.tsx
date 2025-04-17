import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useTransactionContext } from "@/src/context/transactionsContext";
import { renderTransaction } from "./RenderTransaction";

export default function RecentTransactions() {
  const { recentTransactions } = useTransactionContext();

  return (
    <View>
      <Text className="text-xl font-bold my-4">Recent Transactions</Text>
      {recentTransactions.length === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={recentTransactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id || ""}
        />
      )}
    </View>
  );
}