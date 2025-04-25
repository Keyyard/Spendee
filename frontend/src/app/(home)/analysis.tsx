import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useTransactionContext } from "@/src/context/transactionsContext";
import PieChartByCategory from "@/src/components/features/analysis/charts/PieChartByCategory";
import DualLineChart from "@/src/components/features/analysis/charts/DualLineChart";
import CalendarSpending from "@/src/components/features/analysis/CalendarSpending";
import { useRouter } from "expo-router";

export default function Analysis() {
  const { allTransactions } = useTransactionContext();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 pt-4 pb-8">
      <Text className="text-2xl font-bold mb-4 text-gray-900">Analysis</Text>
      <TouchableOpacity
        className="flex-row items-center justify-center bg-blue-500 rounded-xl py-3 mb-5 active:bg-blue-600"
        onPress={() => router.push("/(home)/ai")}
      >
        <Text className="text-white font-bold text-base">💬 Open AI Financial Assistant</Text>
      </TouchableOpacity>
      <CalendarSpending selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <Text className="text-lg font-semibold mb-3 text-gray-900">Spending by Category</Text>
        <PieChartByCategory
          transactions={allTransactions}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      </View>
      <View className="bg-white rounded-2xl p-5 shadow-sm">
        <Text className="text-lg font-semibold mb-3 text-gray-900">Monthly Income vs Expense</Text>
        <DualLineChart transactions={allTransactions} />
      </View>
      <View className="h-32" />
    </ScrollView>
  );
}
