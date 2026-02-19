export interface Client {
    id: string;
    name: string;
    lastName: string;
    birthDate: Date | string;
    phoneNumber: string;
}

export interface ClientCreate {
    name: string;
    lastName: string;
    birthDate: Date | string;
    phoneNumber: string;
}

export interface ClientUpdate{
    name?:string;
    lastname?:string;
    birthDate?: Date |string;
    phoneNumber?:string;
}