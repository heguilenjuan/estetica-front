export interface User {
    id?: string | number,
    name: string;
    username: string;
    role: string;
    permissions: string[];
}