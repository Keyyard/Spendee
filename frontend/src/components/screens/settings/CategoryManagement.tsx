import React, { useState } from "react";
import { View, Text } from "react-native";
import { useCategories } from "@/src/hooks/useCategories";
import type { Category } from "@/src/types/Category";
import type { User } from "@/src/types/User";
import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";

export default function CategoryManagement({ user }: { user: User }) {
  const {
    categories,
    loading,
    error,
    fetchCategories,
    createCategoryHandler,
    updateCategoryHandler,
    deleteCategoryHandler,
  } = useCategories(user.id);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleCreateCategory = async () => {
    await createCategoryHandler(newCategoryName);
    setNewCategoryName("");
  };

  const handleUpdateCategory = async () => {
    if (editingCategory) {
      await updateCategoryHandler(editingCategory.id, editingName);
      setEditingCategory(null);
      setEditingName("");
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    await deleteCategoryHandler(categoryId);
  };

  return (
    <View className="bg-gray-100 rounded-lg">
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
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