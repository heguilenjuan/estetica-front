export interface Client {
    id: string;
    name: string;
    lastName: string;
    dni:string;
    birthDate: Date | string;
    phoneNumber: string;
    created: Date | string;
}

export interface ClientCreate {
    name: string;
    lastName: string;
    dni:string;
    birthDate: Date | string;
    phoneNumber: string;
}

export interface ClientUpdate{
    name?:string;
    lastName?:string;
    dni?:string;
    birthDate?: Date |string;
    phoneNumber?:string;
}