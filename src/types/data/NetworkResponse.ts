export type NetworkResponse<T> = {
    success: boolean;
    data?: T;
    message?: string;
    error?: ErrorMessage[];
}

export type ErrorMessage = {
    error: string;
    message: string;
};