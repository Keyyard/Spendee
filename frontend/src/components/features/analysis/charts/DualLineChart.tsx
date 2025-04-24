import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { MONTHS } from "@/src/constants/chart";
import { useCurrency } from "@/src/context/currencyContext";
import { getFormattedAmount } from "@/src/utils/format";

interface DualLineChartProps {
  transactions: any[];
}

export default function DualLineChart({ transactions }: DualLineChartProps) {
  const { symbol, isPrefix } = useCurrency();
  
  const monthlyData = useMemo(() => {
    const monthlyMap: { [key: number]: { income: number; expense: number } } = {};
    transactions.forEach((t) => {
      const month = new Date(t.date).getMonth();
      if (!monthlyMap[month]) monthlyMap[month] = { income: 0, expense: 0 };
      if (t.type === "income") monthlyMap[month].income += t.amount;
      else if (t.type === "expense") monthlyMap[month].expense += t.amount;
    });
    return Array.from({ length: 12 }, (_, i) => ({
      income: monthlyMap[i]?.income || 0,
      expense: monthlyMap[i]?.expense || 0,
    }));
  }, [transactions]);

  const incomeData = monthlyData.map((item, idx) => ({
    value: item.income,
    dataPointText: item.income > 0 ? getFormattedAmount(item.income, symbol, isPrefix) : '',
    label: MONTHS[idx],
  }));
  
  const expenseData = monthlyData.map((item, idx) => ({
    value: item.expense,
    dataPointText: item.expense > 0 ? getFormattedAmount(item.expense, symbol, isPrefix) : '',
    label: MONTHS[idx],
  }));

  const screenWidth = 360; 
  const chartSpacing = Math.floor((screenWidth - 60) / 14); 

  return (
    <View className="w-full pt-2">
      <LineChart
        data={incomeData}
        data2={expenseData}
        height={240}
        showVerticalLines
        spacing={chartSpacing}
        initialSpacing={chartSpacing / 2}
        color1="#36A2EB"
        color2="#FF6384"
        textColor1="#36A2EB"
        textColor2="#FF6384"
        dataPointsHeight={6}
        dataPointsWidth={6}
        dataPointsColor1="#36A2EB"
        dataPointsColor2="#FF6384"
        textShiftY={20}
        textShiftX={14}
        textFontSize={12}
        xAxisLabelTexts={MONTHS}
        curved
        showDataPointOnFocus
        showStripOnFocus
        stripColor="rgba(170,170,170,0.1)"
        stripHeight={200}
        yAxisColor="#eee"
        xAxisColor="#eee"
        yAxisTextStyle={{ color: '#888', fontSize: 11 }}
        xAxisLabelTextStyle={{ color: '#888', fontSize: 11, marginTop: 8 }}
        hideRules={false}
        rulesColor="#f0f0f0"
        rulesType="solid"
        yAxisLabelWidth={45}
        xAxisIndicesColor="#eee"
        xAxisIndicesHeight={4}
        xAxisIndicesWidth={1}
        showXAxisIndices
        rotateLabel
      />
      <View className="flex-row justify-center mt-6 mb-2">
        <View className="flex-row items-center mr-8">
          <View className="w-4 h-1 bg-[#36A2EB] mr-2 rounded-sm" />
          <Text className="text-sm text-gray-700 font-medium">Income</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-4 h-1 bg-[#FF6384] mr-2 rounded-sm" />
          <Text className="text-sm text-gray-700 font-medium">Expense</Text>
        </View>
      </View>
    </View>
  );
}
