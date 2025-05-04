import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { isFutureDate } from "@/src/utils/calendar";

interface DayCellProps {
  day: number;
  dateString: string;
  selected: boolean;
  disabled: boolean;
  expense: number;
  income: number;
  onPress: (dateString: string) => void;
}

const DayCell: React.FC<DayCellProps> = ({
  day,
  dateString,
  selected,
  disabled,
  expense,
  income,
  onPress,
}) => {
  return (
    <TouchableOpacity
      className={`items-center justify-center w-10 h-14 rounded-lg ${selected ? 'bg-blue-100' : ''}`}
      onPress={() => onPress(dateString)}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text className={`text-base font-semibold ${disabled ? 'text-gray-300' : 'text-gray-900'}`}>{day}</Text>
    </TouchableOpacity>
  );
};

export default DayCell;
