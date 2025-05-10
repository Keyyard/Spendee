import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MONTHS } from "@/src/constants/chart";

interface MonthPickerProps {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
}

export default function MonthPicker({ selectedMonth, setSelectedMonth }: MonthPickerProps) {
  return (
    <View className="flex-row flex-wrap justify-center gap-2 mb-3 px-2">
      {MONTHS.map((month, idx) => (
        <TouchableOpacity
          key={month}
          onPress={() => setSelectedMonth(idx)}
          className={`py-1 px-3 rounded-xl ${selectedMonth === idx ? 'bg-blue-500' : 'bg-gray-100'}`}
        >
          <Text className={`text-sm font-semibold ${selectedMonth === idx ? 'text-white' : 'text-gray-600'}`}>
            {month}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
