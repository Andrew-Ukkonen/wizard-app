export type NetworkResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
}