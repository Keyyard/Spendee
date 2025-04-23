import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MONTHS } from "@/src/constants/chart";
interface MonthPickerProps {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
}

export default function MonthPicker({ selectedMonth, setSelectedMonth }: MonthPickerProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {MONTHS.map((month, idx) => (
          <TouchableOpacity
            key={month}
            onPress={() => setSelectedMonth(idx)}
            style={{
              backgroundColor: selectedMonth === idx ? "#36A2EB" : "#f0f0f0",
              borderRadius: 16,
              paddingVertical: 6,
              paddingHorizontal: 14,
              marginRight: 6,
            }}
          >
            <Text style={{ color: selectedMonth === idx ? "#fff" : "#222", fontWeight: "bold" }}>{month}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
