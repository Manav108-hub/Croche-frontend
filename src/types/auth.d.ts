export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}

export interface AuthResponse {
    access_token: string;
    user: User;
}