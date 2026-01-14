import { Service } from "@prisma/client";

export interface IUserRepository{
    getServices():Promise<Service[]>;
    BookService(serviceId:string):Promise<boolean>;
}