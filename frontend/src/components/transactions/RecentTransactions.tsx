import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { BodyText, Heading, Section } from "@/src/components/atoms";
import { useTransactionContext } from "@/src/hooks/useTransactionContext";
import { renderTransaction } from "./RenderTransaction";

export default function RecentTransactions() {
  const { recentTransactions, loading } = useTransactionContext();

  return (
    <Section>
      <Heading level={3} className="my-4">Recent Transactions</Heading>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : recentTransactions.length === 0 ? (
        <BodyText>No transactions found.</BodyText>
      ) : (
        <FlatList
          data={recentTransactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id || ""}
        />
      )}
    </Section>
  );
}