import React, { useState } from "react";
import { View, Text } from "react-native";
import { Card } from "@/src/components/atoms";
import { useCategories } from "@/src/hooks/useCategories";
import type { Category } from "@/src/types/Category";
import type { User } from "@/src/types/User";
import CategoryList from "@/src/components/organisms/settings/CategoryList";
import CategoryForm from "@/src/components/organisms/settings/CategoryForm";
import BackHeader from "@/src/components/molecules/navigation/BackHeader";
import { useUserContext } from "@/src/hooks/useUserContext";

export default function CategoryManagement() {
  const { user } = useUserContext();
  if (!user) {
    return <Text>Loading user...</Text>;
  }

  const {
    categories,
    loading,
    error,
    addCategory,
    editCategory,
    removeCategory,
  } = useCategories();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleCreateCategory = async () => {
    await addCategory(newCategoryName);
    setNewCategoryName("");
  };

  const handleUpdateCategory = async () => {
    if (editingCategory) {
      await editCategory(editingCategory.id, editingName);
      setEditingCategory(null);
      setEditingName("");
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    await removeCategory(categoryId);
  };

  return (
    <Card className="bg-gray-100 rounded-lg">
      <BackHeader headerTitle="Category Management"/>
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
    </Card>
  );
}