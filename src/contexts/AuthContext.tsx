import { useNavigate } from "@tanstack/react-router";
import { createContext, useState, useContext, useEffect } from "react";
import { LoginResponse } from "../types/data/LoginResponse";
import { AUTH_ENDPOINTS } from "../utils/endpoints";
import { fetchWithAuth, setAccessToken } from "../utils/auth";


interface ProviderProps {
    user: string | null,
    login(data: LoginResponse): void,
    logout(): void,
}

const AuthContext = createContext<ProviderProps>({
    user: null,
    login: () => { },
    logout: () => { },
})

export const randomAlphaNumeric = (length: number) => {
    let s = '';
    Array.from({ length }).some(() => {
        s += Math.random().toString(36).slice(2);
        return s.length >= length;
    });
    return s.slice(0, length);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const storedInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null
    const [user, setUser] = useState<string | null>(storedInfo?.username)
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate({ to: '/login' })
        }
    }, []);

    const login = (data: LoginResponse) => {
        setUser(data.userWrapper.data!.username)
        setAccessToken(data.accessToken)
        localStorage.setItem('user', JSON.stringify(data.userWrapper.data))
        navigate({ to: '/spellbook' })
    }

    const logout = async () => {
        await fetchWithAuth(AUTH_ENDPOINTS.LOGOUT, {
            method: 'POST',
        });
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem('user');
        navigate({ to: '/login' });
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}
