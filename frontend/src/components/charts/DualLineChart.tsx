import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { MONTHS } from "@/src/constants/chart";

interface DualLineChartProps {
  transactions: any[];
}

export default function DualLineChart({ transactions }: DualLineChartProps) {
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
    dataPointText: item.income > 0 ? String(item.income) : '',
    label: MONTHS[idx],
  }));
  const expenseData = monthlyData.map((item, idx) => ({
    value: item.expense,
    dataPointText: item.expense > 0 ? String(item.expense) : '',
    label: MONTHS[idx],
  }));

  return (
    <View>
      <LineChart
        data={incomeData}
        data2={expenseData}
        height={250}
        showVerticalLines
        spacing={44}
        initialSpacing={0}
        color1="#36A2EB"
        color2="#FF6384"
        textColor1="#36A2EB"
        textColor2="#FF6384"
        dataPointsHeight={6}
        dataPointsWidth={6}
        dataPointsColor1="#36A2EB"
        dataPointsColor2="#FF6384"
        textShiftY={5}
        textShiftX={20}
        textFontSize={13}
        xAxisLabelTexts={MONTHS}
        showDataPointOnFocus
        showStripOnFocus
        stripColor="#aaa"
        stripHeight={180}
        yAxisColor="#eee"
        xAxisColor="#eee"
        yAxisTextStyle={{ color: '#888', fontSize: 12 }}
        xAxisLabelTextStyle={{ color: '#888', fontSize: 12, marginTop: 4 }}
        hideRules={false}
        rulesColor="#eee"
        rulesType="solid"
        yAxisLabelWidth={40}
        xAxisIndicesColor="#eee"
        xAxisIndicesHeight={8}
        xAxisIndicesWidth={2}
        showXAxisIndices
      />
      <View className="flex-row justify-center mt-2">
        <View className="flex-row items-center mr-6">
          <View style={{ width: 14, height: 4, backgroundColor: '#36A2EB', marginRight: 6, borderRadius: 2 }} />
          <Text className="text-xs text-gray-800">Income</Text>
        </View>
        <View className="flex-row items-center">
          <View style={{ width: 14, height: 4, backgroundColor: '#FF6384', marginRight: 6, borderRadius: 2 }} />
          <Text className="text-xs text-gray-800">Expense</Text>
        </View>
      </View>
    </View>
  );
}
