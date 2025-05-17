import React from "react";
import { Section, Input, Button, BodyText } from "@/src/components/atoms";

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
    <Section className="flex-row mb-2 p-4 items-center">
      <Input
        value={newCategoryName}
        onChangeText={setNewCategoryName}
        placeholder="New category name"
        className="flex-1 mr-2"
      />
      <Button
        title="Add"
        onPress={handleCreateCategory}
        className="px-4 py-2"
      />
    </Section>
  );
};

export default CategoryForm;
