export interface Calendar{
    id: string;
    timezone: string;
}


export interface CalendarDay{
    date:string;
    availableSlots:number;
}