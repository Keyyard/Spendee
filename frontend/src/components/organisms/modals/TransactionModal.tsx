import React, { useState, useEffect } from "react";
import { Modal, View, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { X } from "lucide-react-native";
import { Transaction } from "@/src/types/Transaction";
import { useUserContext } from "@/src/hooks/useUserContext";
import { useTransactionContext } from "@/src/hooks/useTransactionContext";
import { Card, Input, Button, BodyText, Heading } from "../atoms";
import { useCategories } from "@/src/hooks/useCategories";

interface TransactionModalProps {
  transaction: Transaction | null;
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  transaction,
  visible,
  onClose,
  onSave,
}) => {
  const [description, setDescription] = useState(transaction?.description || "");
  const [amount, setAmount] = useState(transaction?.amount.toString() || "");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { categories, loading: categoriesLoading } = useCategories();
  const { user } = useUserContext();
  const { useDeleteTransaction, useEditTransaction } = useTransactionContext();

  // Set default selected category when categories load or transaction changes
  useEffect(() => {
    if (transaction && transaction.categoryId) {
      setSelectedCategory(transaction.categoryId);
    } else if (categories.length > 0) {
      setSelectedCategory(categories[0].id);
    }
  }, [transaction, categories]);

  const handleSave = async () => {
    if (!amount || !description || !selectedCategory) {
      alert("Please fill in all fields.");
      return;
    }

    const transactionData = {
      description,
      amount: parseFloat(amount),
      categoryId: selectedCategory,
      date: new Date().toISOString(),
    };

    try {
      if (transaction && transaction.id) {
        await useEditTransaction(transaction.id, transactionData);
      }
      alert("Transaction saved successfully!");
      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving transaction:", error);
      alert("Failed to save transaction.");
    }
  };

  const handleDelete = async () => {
    try {
      if (transaction && transaction.id) {
        await useDeleteTransaction(transaction.id);
        alert("Transaction deleted successfully!");
        onSave();
        onClose();
      }
    } catch (error) {
      console.error("Failed to delete transaction:", error);
      alert("Failed to delete transaction.");
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <Card className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-4 right-4 bg-red-200 p-2 rounded-full z-10"
          >
            <X size={24} color="black" />
          </TouchableOpacity>

          <Heading level={2} className="mb-6 text-center">
            {transaction ? "Edit Transaction" : "Add Transaction"}
          </Heading>

          <BodyText className="mb-2">Amount</BodyText>
          <Input
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="Enter amount"
            className="mb-4"
          />

          <BodyText className="mb-2">Description</BodyText>
          <Input
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            className="mb-4"
          />

          <BodyText className="mb-2">Category</BodyText>
          <View className="border border-gray-300 rounded-lg mb-4">
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              className="w-full h-[50px]"
              enabled={!categoriesLoading}
            >
              {categories.map((category) => (
                <Picker.Item
                  key={category.id}
                  label={category.name}
                  value={category.id}
                />
              ))}
            </Picker>
          </View>

          <Button
            onPress={handleSave}
            title={transaction ? "Save Changes" : "Add Transaction"}
            className="mb-4"
          />

          {transaction && (
            <Button
              onPress={handleDelete}
              title="Delete Transaction"
              variant="danger"
            />
          )}
        </Card>
      </View>
    </Modal>
  );
};

export default TransactionModal;