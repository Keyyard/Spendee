import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { X } from "lucide-react-native";
import { useRouter } from "expo-router";

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddTransactionModal({ visible, onClose }: AddTransactionModalProps) {
  const router = useRouter();

  const handleSelectType = (type: "EXPENSE" | "INCOME") => {
    onClose(); 
    router.push({
        pathname: "/addTransaction",
        params: { type },
    })
};

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1 justify-end bg-black/50"
      >

        {/* Modal Content */}
        <View className="w-full max-w-md mx-auto p-6 rounded-2xl mb-[10vh]">

          {/* Expense Button */}
          <View className="mb-3 flex-row justify-between">
            <TouchableOpacity
              className="flex-row items-center justify-between expense p-4 px-12 rounded-lg"
              onPress={() => handleSelectType("EXPENSE")}
            >
              <Text className="text-red-600 font-semibold text-lg">Expense</Text>
            </TouchableOpacity>

            {/* Income Button */}
            <TouchableOpacity
              className="flex-row items-center justify-between income p-4 px-12 rounded-lg"
              onPress={() => handleSelectType("INCOME")}
            >
              <Text className="text-green-600 font-semibold text-lg">Income</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Floating Close Button */}
        <TouchableOpacity
          onPress={onClose}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 p-4 rounded-full shadow-2xl bg-primary"
        >
          <X size={28} color="white" />
        </TouchableOpacity>

      </TouchableOpacity>
    </Modal>
  );
}