const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5175';

export const authEndpoints = () => {
    return {
        register: () => `${baseURL}/auth/register`,
        login: () => `${baseURL}/auth/login`,
        logout: () => `${baseURL}/auth/logout`,
        refreshToken: () => `${baseURL}/auth/refresh-token`,
        revokeToken: () => `${baseURL}/auth/revoke-token`,
        refresh: () => `${baseURL}/auth/refresh`,
        authorized: () => `${baseURL}/auth/authorized`,
    };
}

export const accountEndpoints = () => {
    return {
        getAccount: () => `${baseURL}/account`,
        updateAccount: () => `${baseURL}/account`,
        deleteAccount: () => `${baseURL}/account`,
    };
}
