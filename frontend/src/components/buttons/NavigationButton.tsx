import React from "react";
import { TouchableOpacity } from "react-native";
import { LucideIcon } from "lucide-react-native";

interface NavigationButtonProps {
  onPress: () => void;
  icon: LucideIcon;
  isActive?: boolean;
  isSpecial?: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  onPress,
  icon: Icon,
  isActive = false,
  isSpecial = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${
        isSpecial
          ? "bg-blue-500 rounded-full p-2 shadow-2xl"
          : ""
      }`}
    >
      <Icon size={isSpecial ? 28 : 24} color={isActive ? "#3d82f6" : isSpecial ? "white" : "#9DA3B7"} />
    </TouchableOpacity>
  );
};

export default NavigationButton;