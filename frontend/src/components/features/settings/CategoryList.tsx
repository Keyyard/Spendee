import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { X } from "lucide-react-native";
import type { Category } from "@/src/types/Category";
import { Card, Section, BodyText, Input, Button } from "@/src/imports/Atoms";

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
    <Card className="flex-row justify-between items-center bg-accent mb-2 p-3">
      {editingCategory?.id === item.id ? (
        <Input
          value={editingName}
          onChangeText={setEditingName}
          className="flex-1 mr-2 bg-white"
        />
      ) : (
        <BodyText className="text-lg font-semibold flex-1 mr-2">{item.name}</BodyText>
      )}

      <View className="flex-row space-x-2 items-center">
        {editingCategory?.id === item.id ? (
          <Button
            onPress={handleUpdateCategory}
            title="Save"
            variant="success"
            className="px-3 py-2"
          />
        ) : (
          <Button
            onPress={() => {
              setEditingCategory(item);
              setEditingName(item.name);
            }}
            title="Edit"
            variant="primary"
            className="px-3 py-2 bg-blue-100 text-blue-500"
          />
        )}

        <TouchableOpacity
          onPress={() => handleDeleteCategory(item.id)}
          className="px-2 flex items-center justify-center"
          accessibilityLabel="Delete"
          children={<X size={20} color="red" />}
        />
      </View>
    </Card>
  );

  return (
    <Section className="p-0">
      <ScrollView className="border border-gray-300 rounded-lg p-4 bg-white h-[72vh]">
        {categories.map((category) => (
          <View key={category.id}>{renderCategory({ item: category })}</View>
        ))}
      </ScrollView>
    </Section>
  );
};

export default CategoryList;
