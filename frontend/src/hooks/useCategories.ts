import { useState, useEffect } from "react";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/src/services/categoryService";
import type { Category } from "@/src/types/Category";
import { getErrorMessage, logError } from "@/src/utils/errorHandler";

export function useCategories(userId: string) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchCategories();
    }
  }, [userId]);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAllCategories(userId);
      setCategories(result);
    } catch (err) {
      setError(getErrorMessage(err));
      logError(err);
    } finally {
      setLoading(false);
    }
  };

  const createCategoryHandler = async (name: string) => {
    if (!name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await createCategory(userId, { name });
      fetchCategories();
    } catch (err) {
      setError(getErrorMessage(err));
      logError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateCategoryHandler = async (categoryId: string, name: string) => {
    if (!name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await updateCategory(userId, categoryId, { name });
      fetchCategories();
    } catch (err) {
      setError(getErrorMessage(err));
      logError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategoryHandler = async (categoryId: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCategory(userId, categoryId);
      fetchCategories();
    } catch (err) {
      setError(getErrorMessage(err));
      logError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategoryHandler,
    updateCategoryHandler,
    deleteCategoryHandler,
  };
}
