import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { getAllTransactions } from "@/src/services/transactionService";
import { useUser } from "@clerk/clerk-expo";
import TransactionItem from "@/src/components/TransactionItem";
import { Transaction } from "@/src/types/Transaction";

export default function Logs() {
  const { user } = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const fetchTransactions = async () => {
    if (!user || loading || !hasMore) return;
    setLoading(true);
    try {
      const newTransactions = await getAllTransactions(user.id, page);
      const uniqueTransactions = newTransactions.filter(
        (newTransaction) =>
          !transactions.some((existingTransaction) => existingTransaction.id === newTransaction.id)
      );
      if (uniqueTransactions.length === 0) {
        setHasMore(false);
      } else {
        setTransactions((prev) => [...prev, ...uniqueTransactions]);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TransactionItem transaction={item} />
  );

  return (
    <View className="flex-1 bg-background p-4">
      <Text className="text-2xl font-bold mb-4">Transaction History</Text>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        onEndReached={() => setPage((prev) => prev + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
      />
    </View>
  );
}