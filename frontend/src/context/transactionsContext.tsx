import { createContext, useContext, useEffect, useState } from "react";
import { createTransaction, getAllTransactions, getBudget, getLimitTransactions } from "../services/transactionService";
import { Transaction } from "../types/Transaction";
import type { User } from "../types/User";
import { useUserContext } from "./userContext";

const TransactionsContext = createContext<TransactionsContextType | null>(null);

interface TransactionsContextType {
    budget: number | null;
    recentTransactions: Transaction[];
    allTransactions: Transaction[];
    useBudget: () => Promise<void>;
    useRecentTransactions: () => Promise<void>;
    useAllTransactions: () => Promise<void>;
    useAddTransaction: (transaction: Transaction) => Promise<void>;
}

export const TransactionsProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUserContext();
    const [budget, setBudget] = useState<number | null>(null);
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
        if (!user) return
            const newTransaction = await createTransaction(user.id, transaction);
            setBudget((prev) => (prev || 0) + transaction.amount);
            setAllTransactions((prev) => [...prev, newTransaction]);
            setRecentTransactions((prev) => [newTransaction, ...prev]);
        }

    useEffect(() => {
        useBudget();
        useRecentTransactions();
        useAllTransactions();
    }, [user]);

    return (
        <TransactionsContext.Provider value={{ budget, recentTransactions, allTransactions, useBudget, useRecentTransactions, useAllTransactions, useAddTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export const useTransactionContext = () => {
    const context = useContext(TransactionsContext);
    if (!context) {
        throw new Error("useTransactionContext must be used within a UserProvider");
    }
    return context;
};