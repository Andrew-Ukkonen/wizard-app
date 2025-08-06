const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5175';

export const authEndpoints = () => {
    return {
        register: () => `${baseURL}/auth/register`,
        login: () => `${baseURL}/auth/login`,
        logout: () => `${baseURL}/auth/logout`,
        refreshToken: () => `${baseURL}/auth/refresh-token`,
        revokeToken: () => `${baseURL}/auth/revoke-token`,
        refresh: () => `${baseURL}/auth/refresh`,
        authenticated: () => `${baseURL}/auth/authenticated`,
    };
}

export const accountEndpoints = () => {
    return {
        getAccount: () => `${baseURL}/account`,
        updateAccount: () => `${baseURL}/account`,
        deleteAccount: () => `${baseURL}/account`,
    };
}

export const authRequestBuilder = (token: string | null) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        credentials: 'include' as RequestCredentials,
    };
}