import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface TransactionTypeButtonProps {
  type: "expense" | "income";
  label: string;
  onPress: (type: "expense" | "income") => void;
  className?: string;
}

const TransactionTypeButton: React.FC<TransactionTypeButtonProps> = ({
  type,
  label,
  onPress,
  className,
}) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-between p-4 px-12 rounded-lg ${className}`}
      onPress={() => onPress(type as "expense" | "income")}
    >
      <Text className="font-semibold text-lg text-white">{label}</Text>
    </TouchableOpacity>
  );
};

export default TransactionTypeButton;