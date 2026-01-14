import { User } from "@prisma/client";

export interface IAdminRepository{
    findAllUsers():Promise<User[]>;
    findUserById(userId:string):Promise<User | null>;
    // updateUserStatus(userId:string,isBlocked:boolean):Promise<User>;

}