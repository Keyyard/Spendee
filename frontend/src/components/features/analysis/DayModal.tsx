import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface DayModalProps {
  onClose: () => void;
  selectedDay: string | null;
  dayIncome: number;
  dayExpense: number;
  dayTransactions: any[];
}

const DayModal: React.FC<DayModalProps> = ({
  onClose,
  selectedDay,
  dayIncome,
  dayExpense,
  dayTransactions,
}) => (
  <View className="flex-1 bg-black/30 justify-center items-center">
    <View className="bg-white rounded-2xl p-6 w-80 items-center">
      <Text className="text-lg font-bold mb-2">Details for {selectedDay}</Text>
      <Text className="text-green-500 font-bold mt-2">Income: {dayIncome}</Text>
      <Text className="text-red-500 font-bold mt-1">Expense: {dayExpense}</Text>
      {dayTransactions.length === 0 ? (
        <Text className="mt-2">No transactions.</Text>
      ) : (
        dayTransactions.map((t, idx) => (
          <View key={idx} className="mt-2">
            <Text>{t.description || "(No description)"} - {t.type} - {t.amount}</Text>
          </View>
        ))
      )}
      <TouchableOpacity onPress={onClose} className="mt-4 bg-blue-500 py-2 px-6 rounded-lg">
        <Text className="text-white font-bold">Close</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default DayModal;
