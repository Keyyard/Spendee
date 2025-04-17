import { renderTransaction } from "@/src/components/transactions/RenderTransaction";
import { useTransactionContext } from "@/src/context/transactionsContext";
import type { Transaction } from "@/src/types/Transaction";
import type { User } from "@/src/types/User";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function AllTransactions({ user }: { user: User | null | undefined }) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { allTransactions, useAllTransactions } = useTransactionContext();

  return (
    <>
      <Text className="text-2xl font-bold mb-4">Transaction History</Text>
      <FlatList
        data={allTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id || ""}
        onEndReached={() => setPage((prev) => prev + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
      />
    </>
  );
}