import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useCurrency } from "@/src/context/currencyContext";
import type { Transaction } from "@/src/types/Transaction";
import TransactionModal from "../modals/TransactionModal";
import { formatDate, formatAmount, getFormattedAmount } from "@/src/utils/format";
interface TransactionItemProps {
  transaction: Transaction;
  onSave?: () => void;
  onEdit?: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onSave = () => {},
  onEdit = () => {},
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { symbol, isPrefix } = useCurrency();

  const typeBackgroundColor =
    transaction.type.toLowerCase() === "income" ? "bg-green-100/30" : "bg-red-100/30";
  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View className={`p-4 rounded-3xl m-2 ${typeBackgroundColor}`}>
          <View className="flex-row justify-between items-center">
            <Text className="text-base font-semibold">{transaction.description}</Text>
            <Text
              className={`text-base font-semibold ${
                transaction.type.toLowerCase() === "income"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {transaction.type.toLowerCase() === "income" ? "+" : "-"} {getFormattedAmount(transaction.amount, symbol, isPrefix)}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-sm">{transaction.category}</Text>
          </View>
          <Text className="text-gray-500 text-xs text-end">{formatDate(transaction.date)}</Text>
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