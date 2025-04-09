import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { getBudget } from "@/src/services/transactionService";
import { useCurrency } from "@/src/context/currencyContext";
import { formatBudget } from "@/src/utils/format";
import type { User } from "@/src/types/User";

export default function Budget({ user }: { user: User | null | undefined }) {
  const { currency, symbol, isPrefix } = useCurrency();

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

  return (
    <TouchableOpacity className="w-full py-4 bg-blue-500 rounded-lg shadow-lg mt-2 text-left items-start px-4">
      {loading ? (
        <Text className="text-white font-extrabold text-3xl text-center">
          {symbol} <ActivityIndicator size="small" color="#fff" />
        </Text>
      ) : (
        <Text className="text-white font-extrabold text-3xl text-center">
          {formatBudget(budget || 0, symbol, isPrefix)}
        </Text>
      )}
      <Text className="text-white font-medium text-center">
        Your balance is calculated from income & expenses
      </Text>
    </TouchableOpacity>
  );
}
