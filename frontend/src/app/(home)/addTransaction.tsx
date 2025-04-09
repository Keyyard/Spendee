import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import {
  createTransaction,
} from "@/src/services/transactionService";
import { getAllCategories } from "@/src/services/categoryService";
import { X } from "lucide-react-native";
import { Category } from "../../types/Category";
import { useUserContext } from "@/src/context/userContext";

export default function AddTransaction() {
  const { user } = useUserContext();
  const router = useRouter();
  const { type } = useLocalSearchParams();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!user) return;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getAllCategories(user.id);
        setCategories(result);
        if (result.length > 0) {
          setSelectedCategory(result[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, [user]);

  const handleSubmit = async () => {
    if (!amount || !description || !selectedCategory) {
      alert("Please fill in all fields.");
      return;
    }

    const category = categories.find((cat: Category) => cat.id === selectedCategory)?.name;
    if (!category) {
      alert("Invalid category selected.");
      return;
    }
    const transactionData = {
      userId: user.id,
      type,
      amount: parseFloat(amount),
      description,
      categoryId: selectedCategory,
      date: new Date().toISOString(),
    };

    console.log("Transaction Data:", transactionData);
    try {
      await createTransaction(user.id, transactionData);
      alert("Transaction added successfully!");
      router.back();
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction.");
    }
  };

  return (
    <View className="flex-1 p-6 bg-white">
      <TouchableOpacity
        onPress={() => router.push("/")}
        className="absolute top-6 right-6 bg-red-200 p-2 rounded-full z-10"
      >
        <X size={24} color="black" />
      </TouchableOpacity>

      <Text className="text-2xl font-bold text-gray-800 mb-6">
        Add {type === "EXPENSE" ? "Expense" : "Income"}
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
        onPress={handleSubmit}
        className="bg-blue-600 p-4 rounded-lg"
      >
        <Text className="text-white text-center font-bold">
          Add Transaction
        </Text>
      </TouchableOpacity>
    </View>
  );
}
