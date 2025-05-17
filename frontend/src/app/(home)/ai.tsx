import AIInsightChat from "@/src/components/organisms/analysis/AIInsightChat";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function AIInsightChatScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-gray-100 p-2">
      <AIInsightChat />
    </View>
  );
}
