import React from "react";
import { SignOutButton } from "@/src/components/buttons/SignOutButton";
import BackHeader from "@/src/components/navigation/BackHeader";
import { View } from "react-native";


export default function User() {
  return (
    <View className="flex-1 bg-background p-4">
      <BackHeader headerTitle="User Settings"/>
      <SignOutButton />
    </View>
  )
}
