import { createContext, useContext, useEffect, useState } from "react";
import { createTransaction, deleteTransaction, getAllTransactions, updateTransaction, getBudget, getLimitTransactions } from "../services/transactionService";
import { Transaction, UpdateTransactionType } from "../types/Transaction";
import type { User } from "../types/User";
import { useUserContext } from "../hooks/useUserContext";
import { getErrorMessage, logError } from "@/src/utils/errorHandler";

const TransactionsContext = createContext<TransactionsContextType | null>(null);
export { TransactionsContext };

interface TransactionsContextType {
    budget: number | 0;
    recentTransactions: Transaction[];
    allTransactions: Transaction[];
    useBudget: () => Promise<void>;
    useRecentTransactions: () => Promise<void>;
    useAllTransactions: () => Promise<void>;
    useAddTransaction: (transaction: Transaction) => Promise<void>;
    useDeleteTransaction: (transactionId: string) => Promise<void>;
    useEditTransaction: (transactionId: string, updatedTransaction: UpdateTransactionType) => Promise<void>;
}

export const TransactionsProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUserContext();
    const [budget, setBudget] = useState<number>(0);
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);

    const useRecentTransactions = async () => {
        if (!user) return
            const recentTransactions = await getLimitTransactions(user.id, 5);
            setRecentTransactions(recentTransactions);
    }

    const useAllTransactions = async () => {
        if (!user) return
            const allTransactions = await getAllTransactions(user.id);
            setAllTransactions(allTransactions);
    };

    const useBudget = async () => {
        if (!user) return
            const budget = await getBudget(user.id);
            setBudget(budget);
    };

    const useAddTransaction = async (transaction: Transaction) => {
        if (!user) return;
        try {
            const newTransaction = await createTransaction(user.id, transaction);
            setBudget((prev) => (prev || 0) + transaction.amount);
            setAllTransactions((prev) => [...prev, newTransaction]);
            setRecentTransactions((prev) => [newTransaction, ...prev]);
        } catch (err) {
            logError(err);
        }
    };

    const useDeleteTransaction = async (transactionId: string) => {
        if (!user) return;
        try {
            await deleteTransaction(user.id, transactionId);
            setAllTransactions((prev) => prev.filter((transaction) => transaction.id !== transactionId));
            setRecentTransactions((prev) => prev.filter((transaction) => transaction.id !== transactionId));
            setBudget((prev) => (prev || 0) - (allTransactions.find((transaction) => transaction.id === transactionId)?.amount || 0));
        } catch (err) {
            logError(err);
        }
    };

    const useEditTransaction = async (transactionId: string, updatedTransaction: UpdateTransactionType) => {
        if (!user) return;
        try {
            const updated = await updateTransaction(user.id, transactionId, updatedTransaction);
            setAllTransactions((prev) => prev.map((transaction) => (transaction.id === transactionId ? updated : transaction)));
            setRecentTransactions((prev) => prev.map((transaction) => (transaction.id === transactionId ? updated : transaction)));
        } catch (err) {
            logError(err);
        }
    }
    useEffect(() => {
        useBudget();
        useRecentTransactions();
        useAllTransactions();
    }, [user]);

    return (
        <TransactionsContext.Provider value={{ budget, recentTransactions, allTransactions, useBudget, useRecentTransactions, useAllTransactions, useAddTransaction, useDeleteTransaction, useEditTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}