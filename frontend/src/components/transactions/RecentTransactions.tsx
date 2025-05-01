import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useTransactionContext } from "@/src/hooks/useTransactionContext";
import { renderTransaction } from "./RenderTransaction";

export default function RecentTransactions() {
  const { recentTransactions, loading } = useTransactionContext();

  return (
    <View>
      <Text className="text-xl font-bold my-4">Recent Transactions</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : recentTransactions.length === 0 ? (
        <Text>No transactions found.</Text>
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