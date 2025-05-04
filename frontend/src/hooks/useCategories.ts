import { useCategoryContext } from "@/src/context/categoryContext";

export function useCategories() {
  const context = useCategoryContext();
  if (!context) {
    throw new Error("useCategoryContext must be used within a CategoryProvider");
  }
  return context;
}
