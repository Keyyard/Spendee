import { View, TouchableOpacity } from "react-native";
import { Home, History, Plus, ChartLine, Settings } from "lucide-react-native";
import { useRouter, usePathname } from "expo-router";
import React, { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";

export default function NavigationBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleNavigation = (screen: string) => {
    router.push(screen as any);
  };

  return (
    <>
      <View className="absolute bottom-0 left-0 right-0 flex-row justify-between items-center bg-gray-100 rounded-3xl shadow-lg p-4 mx-4 mb-4">
        <TouchableOpacity onPress={() => handleNavigation("/(home)")}>
          <Home size={24} color={pathname === "/" ? "#3d82f6" : "#9DA3B7"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNavigation("/(home)/logs")}>
          <History size={24} color={pathname === "/logs" ? "#3d82f6" : "#9DA3B7"} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-blue-500 rounded-full p-2 shadow-2xl"
        >
          <Plus size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNavigation("/(home)/chart")}>
          <ChartLine size={24} color={pathname === "/chart" ? "#3d82f6" : "#9DA3B7"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNavigation("/(home)/settings")}>
          <Settings size={24} color={pathname === "/settings" ? "#3d82f6" : "#9DA3B7"} />
        </TouchableOpacity>
      </View>

      <AddTransactionModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
}
