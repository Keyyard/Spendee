import { View, TouchableOpacity } from "react-native";
import { Home, Logs, Plus, ChartLine, Settings } from "lucide-react-native";
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
      {/* Bottom Navigation Bar */}
      <View className="absolute bottom-0 left-0 right-0 flex-row justify-between items-center bg-background rounded-3xl shadow-lg p-4 mx-4 mb-4">
        <TouchableOpacity onPress={() => handleNavigation("/(home)")}>
          <Home size={24} color={pathname === "/" ? "#386641" : "#9DA3B7"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNavigation("/(home)/logs")}>
          <Logs size={24} color={pathname === "/logs" ? "#386641" : "#9DA3B7"} />
        </TouchableOpacity>

        {/* Floating Plus Button to open modal */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-primary rounded-full p-2 shadow-2xl"
        >
          <Plus size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNavigation("/(home)/chart")}>
          <ChartLine size={24} color={pathname === "/chart" ? "#386641" : "#9DA3B7"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNavigation("/(home)/settings")}>
          <Settings size={24} color={pathname === "/profile" ? "#386641" : "#9DA3B7"} />
        </TouchableOpacity>
      </View>

      <AddTransactionModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
}
