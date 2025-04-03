import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { getBudget } from "@/src/services/transactionService";

export default function BudgetScreen({ user }: { user: any | null | undefined }) {
  const [budget, setBudget] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBudget();
    }
  }, [user]);

  const fetchBudget = async () => {
    try {
      const fetchedBudget = await getBudget(user.id);
      setBudget(fetchedBudget);
    } catch (error) {
      console.error("Failed to fetch budget:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <TouchableOpacity className="w-full py-4 bg-primary rounded-lg shadow-lg mt-2 text-left items-start px-4">
      <Text className="text-white font-extrabold text-3xl text-center">${budget}</Text>
      <Text className="text-white font-medium text-center">Your balance is calculated from income & expenses</Text>
    </TouchableOpacity>
  );
}
