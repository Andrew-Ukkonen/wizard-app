import { User } from "../User";
import { NetworkResponse } from "./NetworkResponse";

type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    userWrapper: NetworkResponse<User>;
};

type Account = {
    id: number;
    username: string;
}

export type { LoginResponse, Account };