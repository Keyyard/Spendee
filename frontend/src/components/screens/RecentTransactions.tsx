import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { getAllTransactions } from "@/src/services/transactionService";
import { useUser } from "@clerk/clerk-expo";
import TransactionItem from "../TransactionItem";
import { Transaction } from "@/src/types/Transaction";

export default function RecentTransactions() {
  const { user } = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user || loading) return;
      setLoading(true);
      try {
        const fetchedTransactions = await getAllTransactions(user.id);
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  return (
    <View>
      <Text className="text-xl font-bold my-4">Recent Transactions</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={transactions}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}