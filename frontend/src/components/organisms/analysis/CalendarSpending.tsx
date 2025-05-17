import React, { useMemo, useState } from "react";
import { View, Text, Modal } from "react-native";
import { Calendar } from "react-native-calendars";
import { useTransactionContext } from "@/src/hooks/useTransactionContext";
import { formatDate } from "@/src/utils/format";
import { groupTransactionsByDate, toDateString } from "@/src/utils/calendar";
import DayCell from "./DayCell";
import DayModal from "../../modals/DayModal";

interface CalendarSpendingProps {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
}

export default function CalendarSpending({ selectedMonth, setSelectedMonth }: CalendarSpendingProps) {
  const { allTransactions } = useTransactionContext();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const transactionsByDate = useMemo(() => groupTransactionsByDate(allTransactions), [allTransactions]);

  const markedDates = useMemo(() => {
    const marks: Record<string, any> = {};
    Object.keys(transactionsByDate).forEach((date) => {
      const { income, expense } = transactionsByDate[date];
      if (income > 0 || expense > 0) {
        marks[date] = {
          marked: true,
          dotColor: expense > 0 ? '#FF6384' : '#36A2EB',
        };
      }
    });
    if (selectedDay) {
      marks[selectedDay] = { ...(marks[selectedDay] || {}), selected: true, selectedColor: '#2f95dc' };
    }
    return marks;
  }, [transactionsByDate, selectedDay]);

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDay(day.dateString);
    setModalVisible(true);
  };

  const now = new Date();
  const year = now.getFullYear();
  const currentMonthString = `${year}-${String(selectedMonth + 1).padStart(2, "0")}-01`;

  const onMonthChange = (monthObj: { month: number }) => {
    setSelectedMonth(monthObj.month - 1);
  };

  const dayTransactions = selectedDay ? transactionsByDate[selectedDay]?.transactions || [] : [];
  const dayIncome = selectedDay ? transactionsByDate[selectedDay]?.income || 0 : 0;
  const dayExpense = selectedDay ? transactionsByDate[selectedDay]?.expense || 0 : 0;
  return (
    <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
      <Text className="text-lg font-semibold mb-3 text-gray-900">Calendar</Text>
      <Calendar
        current={currentMonthString}
        onMonthChange={onMonthChange}
        markingType={"dot"}
        markedDates={markedDates}
        onDayPress={onDayPress}
        dayComponent={(
          props: { date: { dateString: string; day: number }; state: string }
        ) => {
          const { date, state } = props;
          const key = date.dateString;
          const info = transactionsByDate[key] || { income: 0, expense: 0 };
          return (
            <DayCell
              day={date.day}
              dateString={key}
              selected={selectedDay === key}
              disabled={state === 'disabled'}
              expense={info.expense}
              income={info.income}
              onPress={(dateString) => onDayPress({ dateString })}
            />
          );
        }}
        theme={{
          todayTextColor: '#2f95dc',
          selectedDayBackgroundColor: '#2f95dc',
          arrowColor: '#2f95dc',
        }}
        style={{ borderRadius: 16 }}
      />
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <DayModal
          onClose={() => setModalVisible(false)}
          selectedDay={selectedDay}
          dayIncome={dayIncome}
          dayExpense={dayExpense}
          dayTransactions={dayTransactions}
        />
      </Modal>
    </View>
  );
}
