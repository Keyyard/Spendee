import React from "react";
import { View, Text } from "react-native";
import { Transaction } from "@/src/types/Transaction";

interface TransactionDetailsProps {
  transaction: Transaction;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ transaction }) => {
  const typeBackgroundColor = transaction.type.toLowerCase() === "income" ? "bg-green-500" : "bg-red-500";
  const formattedType = transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1);
  const formattedDate = new Date(transaction.date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <View className={`p-4 rounded-3xl m-2 ${typeBackgroundColor}`}>
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-semibold">{transaction.description}</Text>
        <Text className="text-gray-600">${transaction.amount}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-gray-500 text-sm">{transaction.category}</Text>
        <Text className="text-gray-700 text-sm font-medium">Type: {formattedType}</Text>
      </View>
      <Text className="text-gray-500 text-xs text-end">{formattedDate}</Text>
    </View>
  );
};

export default TransactionDetails;