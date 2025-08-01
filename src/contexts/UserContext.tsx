// context/UserContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types/User';
import AccountService from '../services/AccountService';

interface UserContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        AccountService.logout('').then(response => {
            if (response.success) {
                setUser(null);
                localStorage.removeItem('user');
            } else {
                console.error('Logout failed:', response.error);
            }
        }).catch(error => {
            console.error('Logout error:', error);
        });
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within UserProvider');
    return context;
};
