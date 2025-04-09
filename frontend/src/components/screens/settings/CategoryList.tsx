import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { X } from "lucide-react-native";
import type { Category } from "@/src/types/Category";

interface CategoryListProps {
  categories: Category[];
  editingCategory: Category | null;
  editingName: string;
  setEditingCategory: (category: Category | null) => void;
  setEditingName: (name: string) => void;
  handleUpdateCategory: () => void;
  handleDeleteCategory: (categoryId: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  editingCategory,
  editingName,
  setEditingCategory,
  setEditingName,
  handleUpdateCategory,
  handleDeleteCategory,
}) => {
  const renderCategory = ({ item }: { item: Category }) => (
    <View className="flex-row justify-between items-center bg-accent rounded-lg mb-2">
      {editingCategory?.id === item.id ? (
        <TextInput
          value={editingName}
          onChangeText={setEditingName}
          className="flex-1 border border-gray-300 p-2 rounded-lg"
        />
      ) : (
        <Text className="text-lg font-semibold">{item.name}</Text>
      )}

      <View className="flex-row space-x-2">
        {editingCategory?.id === item.id ? (
          <TouchableOpacity
            onPress={handleUpdateCategory}
            className="bg-green-500 p-2 rounded-lg"
          >
            <Text className="text-white">Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setEditingCategory(item);
              setEditingName(item.name);
            }}
            className="p-2 rounded-lg"
          >
            <Text className="text-blue-500">Edit</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => handleDeleteCategory(item.id)}
          className="bg-red-500 p-2 rounded-lg"
        >
          <X size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      {categories.map((category) => (
        <View key={category.id}>{renderCategory({ item: category })}</View>
      ))}
    </View>
  );
};

export default CategoryList;
