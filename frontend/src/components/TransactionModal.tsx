import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { X } from "lucide-react-native";
import { Transaction } from "@/src/types/Transaction";
import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "@/src/services/transactionService";
import { getAllCategories } from "@/src/services/categoryService";

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
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getAllCategories("userId");
        setCategories(result);
        if (result.length > 0) {
          setSelectedCategory(result[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
      if (transaction) {
        await updateTransaction("userId", transaction.id, transactionData);
      } else {
        await createTransaction("userId", transactionData);
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
      if (transaction) {
        await deleteTransaction("userId", transaction.id);
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
      <View className="flex-1 justify-center items-center bg-background/50">
        <View className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-4 right-4 bg-red-200 p-2 rounded-full"
          >
            <X size={24} color="black" />
          </TouchableOpacity>

          <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {transaction ? "Edit Transaction" : "Add Transaction"}
          </Text>

          <Text className="text-gray-600 mb-2">Amount</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="Enter amount"
            className="border border-gray-300 p-4 rounded-lg mb-4"
          />

          <Text className="text-gray-600 mb-2">Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            className="border border-gray-300 p-4 rounded-lg mb-4"
          />

          <Text className="text-gray-600 mb-2">Category</Text>
          <View className="border border-gray-300 rounded-lg mb-4">
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              style={{ height: 50, width: "100%" }}
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

          <TouchableOpacity
            onPress={handleSave}
            className="bg-blue-600 p-4 rounded-lg mb-4"
          >
            <Text className="text-white text-center font-bold">
              {transaction ? "Save Changes" : "Add Transaction"}
            </Text>
          </TouchableOpacity>

          {transaction && (
            <TouchableOpacity
              onPress={handleDelete}
              className="bg-red-600 p-4 rounded-lg"
            >
              <Text className="text-white text-center font-bold">Delete Transaction</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default TransactionModal;