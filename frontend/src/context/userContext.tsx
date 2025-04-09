import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState, createContext, useContext } from "react";
import type { User } from "../types/User";

const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUser();
    const [userData, setUserData] = useState<User | null>(null);
    
    useEffect(() => {
        if (user) {
        setUserData(user);
        } else {
        setUserData(null);
        }
    }, [user]);
    
    return (
        <UserContext.Provider value={{ user: userData }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};