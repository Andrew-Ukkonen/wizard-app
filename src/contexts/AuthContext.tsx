import { useNavigate } from "@tanstack/react-router";
import { createContext, useState, useContext, useEffect } from "react";
import { LoginResponse } from "../types/data/LoginResponse";


interface ProviderProps {
    user: string | null,
    accessToken: string | null,
    login(data: LoginResponse): void,
    logout(): void,
    setAccessToken(token: string | null): void;
}

const AuthContext = createContext<ProviderProps>({
    user: null,
    accessToken: null,
    login: () => { },
    logout: () => { },
    setAccessToken: (_token: string | null) => { }
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
    const [user, setUser] = useState<string | null>(storedInfo?.email)
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const navigate = useNavigate();

    // Try to refresh token on load
    useEffect(() => {
        const tryRefresh = async () => {
            const response = await fetch('/auth/refresh', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setAccessToken(data.accessToken);
            }
        };

        tryRefresh();
    }, []);

    const login = (data: LoginResponse) => {
        setTimeout(() => {
            setUser(data.userWrapper.data!.username)
            setAccessToken(data.tokens.accessToken)
            localStorage.setItem('user', JSON.stringify(data.userWrapper.data))
            navigate({ to: '/spellbook' })
        }, 1000);
    }

    const logout = () => {
        setUser(null)
        setAccessToken(null)
        localStorage.removeItem('user')
        navigate({ to: '/login' })
    }

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}
