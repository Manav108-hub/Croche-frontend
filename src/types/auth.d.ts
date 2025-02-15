export interface User {
    id: string;       // Use only one ID field
    name: string;
    email: string;
    isAdmin: boolean;
    createdAt: string; // Keep as string for client
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