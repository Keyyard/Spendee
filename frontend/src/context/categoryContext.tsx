import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "@/src/services/categoryService";
import type { Category } from "@/src/types/Category";
import { useUserContext } from "@/src/hooks/useUserContext";
import { getErrorMessage, logError } from "@/src/utils/errorHandler";

interface CategoryContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  editCategory: (categoryId: string, name: string) => Promise<void>;
  removeCategory: (categoryId: string) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | null>(null);
export { CategoryContext };

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const result = await getAllCategories(user.id);
      setCategories(result);
    } catch (err) {
      setError(getErrorMessage(err));
      logError(err);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (name: string) => {
    if (!user || !name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await createCategory(user.id, { name });
      await fetchCategories();
    } catch (err) {
      setError(getErrorMessage(err));
      logError(err);
    } finally {
      setLoading(false);
    }
  };

  const editCategory = async (categoryId: string, name: string) => {
    if (!user || !name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await updateCategory(user.id, categoryId, { name });
      await fetchCategories();
    } catch (err) {
      setError(getErrorMessage(err));
      logError(err);
    } finally {
      setLoading(false);
    }
  };

  const removeCategory = async (categoryId: string) => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      await deleteCategory(user.id, categoryId);
      await fetchCategories();
    } catch (err) {
      setError(getErrorMessage(err));
      logError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCategories();
    } else {
      setCategories([]);
      setLoading(false);
      setError(null);
    }
  }, [user]);

  return (
    <CategoryContext.Provider value={{ categories, loading, error, fetchCategories, addCategory, editCategory, removeCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export function useCategoryContext() {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("useCategoryContext must be used within a CategoryProvider");
  return ctx;
}
