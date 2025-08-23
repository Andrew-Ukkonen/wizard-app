const baseURL = (import.meta.env.VITE_API_URL || 'http://localhost:5175') + '/api';

export const AUTH_ENDPOINTS = {
    REGISTER: `${baseURL}/auth/register`,
    LOGIN: `${baseURL}/auth/login`,
    LOGOUT: `${baseURL}/auth/logout`,
    REVOKE: `${baseURL}/auth/revoke`,
    REFRESH: `${baseURL}/auth/refresh`,
    AUTHENTICATED: `${baseURL}/auth/authenticated`,
};

export const accountEndpoints = {
    getAccount: `${baseURL}/account`,
    updateAccount: `${baseURL}/account`,
    deleteAccount: `${baseURL}/account`,
};