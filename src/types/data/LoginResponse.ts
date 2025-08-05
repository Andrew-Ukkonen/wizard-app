import { NetworkResponse } from "./NetworkResponse";

type LoginResponse = {
    tokens: TokenResponse;
    userWrapper: NetworkResponse<LoginDto>;
};

type TokenResponse = {
    accessToken: string;
    refreshToken: string;
}

type LoginDto = {
    id: number;
    username: string;
}

export type { LoginResponse, LoginDto, TokenResponse };