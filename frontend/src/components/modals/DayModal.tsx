import React from "react";
import { Card, BodyText, Heading, Button } from "@/src/components/atoms";
import { View } from "react-native";

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
  <Card className="flex-1 bg-black/30 justify-center items-center">
    <Card className="p-6 w-80 items-center">
      <Heading level={3} className="mb-2">Details for {selectedDay}</Heading>
      <BodyText className="text-green-500 font-bold mt-2">Income: {dayIncome}</BodyText>
      <BodyText className="text-red-500 font-bold mt-1">Expense: {dayExpense}</BodyText>
      {dayTransactions.length === 0 ? (
        <BodyText className="mt-2">No transactions.</BodyText>
      ) : (
        dayTransactions.map((t, idx) => (
          <View key={idx} className="mt-2">
            <BodyText>{t.description || "(No description)"} - {t.type} - {t.amount}</BodyText>
          </View>
        ))
      )}
      <Button onPress={onClose} title="Close" className="mt-4 px-6 py-2" />
    </Card>
  </Card>
);

export default DayModal;
