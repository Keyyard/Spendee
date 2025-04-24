import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { CHART_COLORS, MONTHS } from "@/src/constants/chart";
import { incrementMonth, decrementMonth, formatMonthYear } from "@/src/utils/monthYear";

interface PieChartByCategoryProps {
  transactions: any[];
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
}

export default function PieChartByCategory({ transactions, selectedMonth, setSelectedMonth }: PieChartByCategoryProps) {
  const now = new Date();
  const [monthYear, setMonthYear] = useState({ month: selectedMonth, year: now.getFullYear() });
  const { month, year } = monthYear;

  const filtered = useMemo(() =>
    transactions.filter(t => {
      const date = new Date(t.date);
      return t.type === "expense" && date.getMonth() === month && date.getFullYear() === year;
    }),
    [transactions, month, year]
  );

  const categoryMap: { [key: string]: number } = {};
  filtered.forEach(t => {
    const cat = t.category as string;
    categoryMap[cat] = (categoryMap[cat] || 0) + t.amount;
  });
  const pieData = Object.keys(categoryMap).map((key, idx) => ({
    value: categoryMap[key],
    color: CHART_COLORS[idx % CHART_COLORS.length],
    text: key,
  }));

  const handlePrevMonth = () => {
    setMonthYear(prev => decrementMonth(prev));
  };
  const handleNextMonth = () => {
    setMonthYear(prev => incrementMonth(prev));
  };

  return (
    <View className="flex items-center justify-center w-full">
      <View className="flex-col items-center justify-center w-[220px]">
        <View className="flex-row items-center justify-between mb-3 w-full">
          <TouchableOpacity onPress={handlePrevMonth} className="p-2 rounded-full bg-gray-100 mr-6">
            <Text className="text-xl text-blue-500 font-bold">{"<"}</Text>
          </TouchableOpacity>
          <Text className="text-base font-bold text-gray-800 mx-3">{formatMonthYear(month, year, MONTHS)}</Text>
          <TouchableOpacity onPress={handleNextMonth} className="p-2 rounded-full bg-gray-100 ml-6">
            <Text className="text-xl text-blue-500 font-bold">{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row items-center justify-center w-full">
        <View>
          {pieData.length === 0 ? (
            <Text className="text-gray-400 text-base text-center my-6">No expense data for this month.</Text>
          ) : (
            <PieChart
              data={pieData}
              radius={90}
              innerRadius={60}
              donut={true}
              showText={false}
              showValuesAsLabels={false}
              focusOnPress
              showTooltip
            />
          )}
        </View>
        {pieData.length > 0 && (
          <View className="ml-6 justify-center min-w-[100px] flex-1">
            {pieData.map((item) => (
              <View key={item.text} className="flex-row items-center mb-3">
                <View className="w-3.5 h-3.5 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                <Text className="text-base font-bold text-gray-800">{item.text}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
