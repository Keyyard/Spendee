import { useCurrency } from "@/src/hooks/useCurrency";
import { useTransactionContext } from "@/src/hooks/useTransactionContext";
import type { User } from "@/src/types/User";
import { formatBudget } from "@/src/utils/format";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export default function Budget({ user }: { user: User | null | undefined }) {
  const { currency, symbol, isPrefix } = useCurrency();
  const { budget, useBudget } = useTransactionContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudget = async () => {
        setLoading(true);
        await useBudget();
        setLoading(false);
    };
    fetchBudget();
  }, [user]);

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
