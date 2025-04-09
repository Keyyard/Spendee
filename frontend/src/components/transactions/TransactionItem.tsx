import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { Transaction } from "@/src/types/Transaction";
import TransactionModal from "../modals/TransactionModal";

interface TransactionItemProps {
  transaction: Transaction;
  onSave?: () => void;
  onEdit?: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onSave = () => { },
  onEdit = () => { }
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const typeBackgroundColor = transaction.type.toLowerCase() === "income" ? "transaction-income" : "transaction-expense";
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
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View className={`p-4 rounded-3xl m-2 ${typeBackgroundColor}`}>
          <View className="flex-row justify-between items-center">
            <Text className="text-base font-semibold">{transaction.description}</Text>
            <Text
              className={`text-base font-semibold ${transaction.type.toLowerCase() === "income" ? "text-green-500" : "text-red-500"}`}
            >
              {transaction.type.toLowerCase() === "income" ? `+` : `-`} ${transaction.amount}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-sm">{transaction.category}</Text>
          </View>
          <Text className="text-gray-500 text-xs text-end">{formattedDate}</Text>
        </View>
      </TouchableOpacity>

      {modalVisible && (
        <TransactionModal
          transaction={transaction}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={onSave}
        />
      )}

    </>
  );
};

export default TransactionItem;