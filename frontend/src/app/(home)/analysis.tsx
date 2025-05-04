import React, { useState } from "react";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { Card } from "@/src/imports/Atoms";
import { useTransactionContext } from "@/src/imports/Context";
import { PieChartByCategory, DualLineChart, CalendarSpending } from "@/src/imports/Analysis";
import { useRouter } from "@/src/imports/Expo";

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
      <Card className="mb-6">
        <Text className="text-lg font-semibold mb-3 text-gray-900">Spending by Category</Text>
        <PieChartByCategory
          transactions={allTransactions}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      </Card>
      <Card>
        <Text className="text-lg font-semibold mb-3 text-gray-900">Monthly Income vs Expense</Text>
        <DualLineChart transactions={allTransactions} />
      </Card>
    </ScrollView>
  );
}
