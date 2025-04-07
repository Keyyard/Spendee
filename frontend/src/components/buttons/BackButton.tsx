import React from "react";
import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} className="ml-4">
      <ArrowLeft size={24} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;