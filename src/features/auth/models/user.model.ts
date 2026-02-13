export type UserRole = 'admin' | 'basic' | 'manager';

export interface User {
    id: string;
    name: string;
    lastname: string;
    username: string;
    role: UserRole;
    image?: string | null;
}

export interface UserCreate {
    name: string;
    lastname: string;
    username: string;
    role: UserRole;
    password: string;
    image?: string;
}