const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5175'; // Fallback to local URL if not set

export const authEndpoints = () => {
    return {
        register: () => `${baseURL}/auth/register`,
        login: () => `${baseURL}/auth/login`,
        logout: () => `${baseURL}/auth/logout`,
        refreshToken: () => `${baseURL}/auth/refresh-token`,
        revokeToken: () => `${baseURL}/auth/revoke-token`,
    };
}

export const accountEndpoints = () => {
    return {
        getAccount: () => `${baseURL}/account`,
        updateAccount: () => `${baseURL}/account`,
        deleteAccount: () => `${baseURL}/account`,
    };
}
