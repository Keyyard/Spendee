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
    loading: boolean;
}

export const TransactionsProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUserContext();
    const [budget, setBudget] = useState<number>(0);
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const useRecentTransactions = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const recentTransactions = await getLimitTransactions(user.id, 5);
            setRecentTransactions(recentTransactions || []);
        } catch (err) {
            setRecentTransactions([]);
            logError(err);
        } finally {
            setLoading(false);
        }
    };

    const useAllTransactions = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const allTransactions = await getAllTransactions(user.id);
            setAllTransactions(allTransactions || []);
        } catch (err) {
            setAllTransactions([]);
            logError(err);
        } finally {
            setLoading(false);
        }
    };

    const useBudget = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const budget = await getBudget(user.id);
            setBudget(budget || 0);
        } catch (err) {
            setBudget(0);
            logError(err);
        } finally {
            setLoading(false);
        }
    };

    const useAddTransaction = async (transaction: Transaction) => {
        if (!user) return;
        setLoading(true);
        try {
            const newTransaction = await createTransaction(user.id, transaction);
            setBudget((prev) => (prev || 0) + transaction.amount);
            setAllTransactions((prev) => [...prev, newTransaction]);
            setRecentTransactions((prev) => [newTransaction, ...prev]);
        } catch (err) {
            logError(err);
        } finally {
            setLoading(false);
        }
    };

    const useDeleteTransaction = async (transactionId: string) => {
        if (!user) return;
        setLoading(true);
        try {
            await deleteTransaction(user.id, transactionId);
            setAllTransactions((prev) => prev.filter((transaction) => transaction.id !== transactionId));
            setRecentTransactions((prev) => prev.filter((transaction) => transaction.id !== transactionId));
            setBudget((prev) => (prev || 0) - (allTransactions.find((transaction) => transaction.id === transactionId)?.amount || 0));
        } catch (err) {
            logError(err);
        } finally {
            setLoading(false);
        }
    };

    const useEditTransaction = async (transactionId: string, updatedTransaction: UpdateTransactionType) => {
        if (!user) return;
        setLoading(true);
        try {
            const updated = await updateTransaction(user.id, transactionId, updatedTransaction);
            setAllTransactions((prev) => prev.map((transaction) => (transaction.id === transactionId ? updated : transaction)));
            setRecentTransactions((prev) => prev.map((transaction) => (transaction.id === transactionId ? updated : transaction)));
        } catch (err) {
            logError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            setLoading(true);
            Promise.all([useBudget(), useRecentTransactions(), useAllTransactions()]).finally(() => setLoading(false));
        } else {
            setBudget(0);
            setRecentTransactions([]);
            setAllTransactions([]);
            setLoading(false);
        }
    }, [user]);

    return (
        <TransactionsContext.Provider value={{ budget, recentTransactions, allTransactions, useBudget, useRecentTransactions, useAllTransactions, useAddTransaction, useDeleteTransaction, useEditTransaction, loading }}>
            {children}
        </TransactionsContext.Provider>
    );
}