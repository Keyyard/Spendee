import { createContext, useContext, useEffect, useState } from "react";
import { getBudget } from "../services/transactionService";
import { Transaction } from "../types/Transaction";
import type { User } from "../types/User";
import { useUserContext } from "./userContext";

const TransactionsContext = createContext<TransactionsContextType | null>(null);

interface TransactionsContextType {
    budget: number | null;
    useBudget: () => Promise<void>;
}

export const TransactionsProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUserContext();
    const [budget, setBudget] = useState<number | null>(null);

    const useBudget = async () => {
        if (user) {
            const budget = await getBudget(user.id);
            setBudget(budget);
        } else {
            setBudget(null);    
        }
    };

    useEffect(() => {
        useBudget();
    }, [user]);

    return (
        <TransactionsContext.Provider value={{ budget, useBudget }}>
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