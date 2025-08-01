import axios, { AxiosResponse } from 'axios';
import { User } from '../types/User';
import { NetworkResponse } from '../types/data/NetworkResponse';
import { LoginResponse } from '../types/data/LoginResponse';

const API_BASE_URL = import.meta.env.VITE_API_URL;

class AccountService {
    async register(email: string, username: string, password: string): Promise<NetworkResponse<User>> {
        try {
            const response = await axios.post(`${API_BASE_URL}/account/register`, {
                email,
                username,
                password,
            });

            console.log('Register response:', response.data);

            const user: User = response.data as User;
            return { success: true, data: user };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return { success: false, error: error.message };
            }
        }

        return { success: false, error: 'Unknown error occurred during register.' };
    }

    async login(login: string, password: string): Promise<NetworkResponse<User>> {
        try {
            const response: AxiosResponse<LoginResponse> =
                await axios.post(`${API_BASE_URL}/auth/login`, {
                    login,
                    password,
                });

            console.log('Login response:', response.data);

            const user: User = response.data.userWrapper.data as User;
            localStorage.setItem('refresh', JSON.stringify(response.data.refreshToken));

            return { success: true, data: user };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return { success: false, error: error.message };
            }
        }

        return { success: false, error: 'Unknown error occurred during login.' };
    }

    async logout(token: string): Promise<NetworkResponse<void>> {
        try {
            const response: AxiosResponse<NetworkResponse<void>> =
                await axios.post(`${API_BASE_URL}/auth/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            console.log('Logout response:', response.data);

            return { success: true, data: undefined };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return { success: false, error: error.message };
            }
        }

        return { success: false, error: 'Unknown error occurred during logout.' };
    }

    async getAccount(token: string): Promise<string> {
        try {
            const response: AxiosResponse<string> =
                await axios.get(`${API_BASE_URL}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            console.log('Get account response:', response.data);

            return JSON.parse(response.data) as string;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return error.message;
            }

            return 'Unknown error occurred during getAccount.';
        }
    }
}

export default new AccountService();