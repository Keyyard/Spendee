import React, { useState } from "react";
import { View } from "react-native";
import { useRouter, usePathname } from "expo-router";
import AddTransactionModal from "../../modals/AddTransactionModal";
import NavigationButton from "../../atoms/buttons/NavigationButton";
import { Home, History, Plus, ChartLine, Settings } from "lucide-react-native";

export default function NavigationBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleNavigation = (screen: string) => {
    router.push(screen as any);
  };

  return (
    <View className="bg-gray-100 pb-12">
      <View className="absolute bottom-0 left-0 right-0 flex-row justify-between items-center bg-gray-100 rounded-3xl shadow-lg p-4 mx-4 mb-4">
        <NavigationButton
          onPress={() => handleNavigation("/(home)")}
          icon={Home}
          isActive={pathname === "/"}
        />
        <NavigationButton
          onPress={() => handleNavigation("/(home)/history")}
          icon={History}
          isActive={pathname === "/history"}
        />
        <NavigationButton
          onPress={() => setModalVisible(true)}
          icon={Plus}
          isSpecial
        />
        <NavigationButton
          onPress={() => handleNavigation("/(home)/analysis")}
          icon={ChartLine}
          isActive={pathname === "/analysis"}
        />
        <NavigationButton
          onPress={() => handleNavigation("/(home)/settings")}
          icon={Settings}
          isActive={pathname === "/settings"}
        />
      </View>

      <AddTransactionModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}
