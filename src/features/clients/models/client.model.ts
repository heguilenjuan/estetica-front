export interface Client {
    id: string;
    name: string;
    lastname: string;
    birthDate: Date | string;
    phoneNumber: string;
}

export interface ClientCreate {
    name: string;
    lastname: string;
    birthDate: Date | string;
    phoneNumber: string;
}