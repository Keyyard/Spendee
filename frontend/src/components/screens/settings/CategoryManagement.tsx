import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/src/services/categoryService";
import type { Category } from "@/src/types/Category";
import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";

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

  return (
    <View className="bg-gray-100 rounded-lg">
      <Text className="text-xl font-bold mb-4">Manage Categories</Text>
      <CategoryForm
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
        handleCreateCategory={handleCreateCategory}
      />
      <CategoryList
        categories={categories}
        editingCategory={editingCategory}
        editingName={editingName}
        setEditingCategory={setEditingCategory}
        setEditingName={setEditingName}
        handleUpdateCategory={handleUpdateCategory}
        handleDeleteCategory={handleDeleteCategory}
      />
    </View>
  );
}