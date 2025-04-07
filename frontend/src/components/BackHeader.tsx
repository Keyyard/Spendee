import React from "react";
import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { useRouter, Stack } from "expo-router";
import BackButton from "./buttons/BackButton";

interface BackHeaderProps {
  headerTitle?: string;
}

export default function BackHeader({ headerTitle = "" }: BackHeaderProps) {
  return (
    <Stack.Screen
      options={{
        headerTitle: headerTitle,
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerLeft: () => <BackButton />, // Reusable BackButton component
      }}
    />
  );
}
