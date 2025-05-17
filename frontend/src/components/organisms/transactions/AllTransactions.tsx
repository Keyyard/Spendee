import { renderTransaction } from "@/src/components/organisms/transactions/RenderTransaction";
import { useTransactionContext } from "@/src/hooks/useTransactionContext";
import type { Transaction } from "@/src/types/Transaction";
import type { User } from "@/src/types/User";
import React, { useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { Heading, BodyText, Section } from "@/src/components/atoms";

export default function AllTransactions({ user }: { user: User | null | undefined }) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { allTransactions, useAllTransactions } = useTransactionContext();

  return (
    <Section>
      <Heading level={2} className="mb-4">Transaction History</Heading>
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
    </Section>
  );
}