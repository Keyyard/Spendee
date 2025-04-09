import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/src/services/categoryService";
import type { Category } from "@/src/types/Category";
export default function CategoryManagement({ user }: { user: any }) {
  const [categories, setCategories] = useState([] as Category[]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    if (!user) return;
    try {
      const result = await getAllCategories(user.id);
      setCategories(result);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await createCategory(user.id, { name: newCategoryName });
      setNewCategoryName("");
      fetchCategories();
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !editingName.trim()) return;
    try {
      await updateCategory(user.id, editingCategory.id, { name: editingName });
      setEditingCategory(null);
      setEditingName("");
      fetchCategories();
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this category?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCategory(user.id, categoryId);
              fetchCategories();
            } catch (error) {
              console.error("Failed to delete category:", error);
            }
          },
        },
      ]
    );
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <View className="flex-row justify-between items-center p-4 bg-accent rounded-lg shadow mb-2">
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
            className="bg-blue-500 p-2 rounded-lg"
          >
            <Text className="text-white">Edit</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => handleDeleteCategory(item.id)}
          className="bg-red-500 p-2 rounded-lg"
        >
          <Text className="text-white">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="p-4 bg-gray-100 rounded-lg">
      <Text className="text-xl font-bold mb-4">Manage Categories</Text>

      <View className="flex-row mb-4">
        <TextInput
          value={newCategoryName}
          onChangeText={setNewCategoryName}
          placeholder="New category name"
          className="flex-1 border border-gray-300 p-2 rounded-lg"
        />
        <TouchableOpacity
          onPress={handleCreateCategory}
          className="bg-blue-500 p-2 rounded-lg ml-2"
        >
          <Text className="text-white">Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}