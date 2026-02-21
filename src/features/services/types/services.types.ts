export interface Profession {
    id:string;
    name:string;
    description?: string;
    color?:string;
}

export interface ProfessionCreate{
    name:string;
    description?:string;
    color?:string;
}

export interface Category{
    id:string;
    professionId:string;
    name:string;
    icon?:string;
}

export interface CategoryCreate{
    professionId:string;
    name:string;
    icon?:string;
}

export interface CategoryView extends Category{
    professionName:string;
}

export interface Treatment {
    id: string;
    categoryId: string;
    name: string;
    description?: string;
    price: number;
    costPrice?: number;
    durationMin: number;
    isActive: boolean;
}

export interface TreatmentCreate{
    categoryId:string;
    name:string;
    description?:string;
    price:number;
    costPrice?:number;
    durationMin:number;
    isActive?:boolean;
}


export interface TreatmentView extends Treatment{
    categoryName:string;
    professionName:string;
}