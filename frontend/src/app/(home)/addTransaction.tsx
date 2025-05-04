import React, { useState, useEffect } from "react";
import { View, Modal, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useUserContext } from "@/src/hooks/useUserContext";
import { useTransactionContext } from "@/src/hooks/useTransactionContext";
import { Card, Input, Button, BodyText, Heading } from "@/src/components/atoms";
import { useCategories } from "@/src/hooks/useCategories";

export default function AddTransaction() {
  const { user } = useUserContext();
  const router = useRouter();
  const { type } = useLocalSearchParams();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { categories, loading: categoriesLoading } = useCategories();

  const { useAddTransaction } = useTransactionContext();
  if (!user) return;

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories]);

  const handleSubmit = async () => {
    if (!amount || !description || !selectedCategory) {
      alert("Please fill in all fields.");
      return;
    }

    const category = categories.find((cat) => cat.id === selectedCategory)?.name;
    if (!category) {
      alert("Invalid category selected.");
      return;
    }

    const validType = type === "income" || type === "expense" ? type : "expense";
    
    const transactionData = {
      userId: user.id,
      type: validType,
      amount: parseFloat(amount),
      description,
      categoryId: selectedCategory,
      date: new Date().toISOString(),
    };

    console.log("Transaction Data:", transactionData);
    try {
      await useAddTransaction(transactionData);
      alert("Transaction added successfully!");
      router.push("/");
    }
    catch (error) {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction. Please try again.");
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

      <Heading level={2} className="mb-6">
        Add {type === "EXPENSE" ? "Expense" : "Income"}
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
        onPress={handleSubmit}
        title="Add Transaction"
      />
    </View>
  );
}
