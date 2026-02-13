export interface Treatment{
    id:string;
    name:string;
    description:string;
    price?:number;
    costPrice?:number;
    categoryId:string;
    professionIds: string[];
}