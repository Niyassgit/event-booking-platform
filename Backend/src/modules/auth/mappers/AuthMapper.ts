import { User } from "@prisma/client";
import { UserDto } from "../dtos/UserDto";
import { Role } from "../../../utils/enums";

export class AuthMapper{
    static userTODomain(data:User):UserDto{
        return {
            id:data.id,
            name:data.name,
            email:data.email,
            isBlocked:data.isBlocked,
            role:data.role as Role,
        }
    }
}