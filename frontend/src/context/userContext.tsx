import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState, createContext, useContext, useMemo } from "react";
import type { User } from "../types/User";

const UserContext = createContext<User | null>(null);
export { UserContext };

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