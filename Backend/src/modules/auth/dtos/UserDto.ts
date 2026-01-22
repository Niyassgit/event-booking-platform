import { Role } from "../../../utils/enums";

export interface UserDto {
  id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  role: Role;
}
