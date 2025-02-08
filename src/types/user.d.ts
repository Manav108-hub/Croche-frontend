export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    userDetails: UserDetails;
}

export interface UserDetails {
    id: string;
    userId: string;
    address: string;
    city: string;
    pincode: number;
    country: string;
    phone: string;
}

export interface UpdateUserDetails {
    address: string;
    city: string;
    pincode: number;
    country: string;
    phone: string;
}