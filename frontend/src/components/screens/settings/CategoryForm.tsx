import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

interface CategoryFormProps {
  newCategoryName: string;
  setNewCategoryName: (name: string) => void;
  handleCreateCategory: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  newCategoryName,
  setNewCategoryName,
  handleCreateCategory,
}) => {
  return (
    <View className="flex-row mb-4">
      <TextInput
        value={newCategoryName}
        onChangeText={setNewCategoryName}
        placeholder="New category name"
        className="flex-1 border border-gray-300 p-2 rounded-lg"
      />
      <TouchableOpacity
        onPress={handleCreateCategory}
        className="bg-blue-500 p-2 px-4 rounded-lg ml-2"
      >
        <Text className="text-white">Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryForm;
