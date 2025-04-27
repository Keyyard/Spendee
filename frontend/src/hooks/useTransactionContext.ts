import { useContext } from "react";
import { TransactionsContext } from "../context/transactionsContext";

export const useTransactionContext = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactionContext must be used within a TransactionsProvider");
  }
  return context;
};
