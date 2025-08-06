import { NetworkResponse } from "./NetworkResponse";

type LoginResponse = {
    accessToken: string;
    userWrapper: NetworkResponse<LoginDto>;
};

type LoginDto = {
    id: number;
    username: string;
}

export type { LoginResponse, LoginDto };