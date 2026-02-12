export interface Appointment{
    date:Date;
    state:string;
    idClient:string;
    idTreatment:string[];
    idUser: string;
    idPayment: string;
}