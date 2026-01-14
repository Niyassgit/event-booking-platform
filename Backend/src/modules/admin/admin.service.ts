import { IAdminRepository } from "./interfaces/IAdminRepository";
import { NotFoundError } from "../../utils/errors";
import { errorMessages } from "../../utils/messages";

export class AdminService {
  private adminRepository: IAdminRepository;

  constructor(adminRepository: IAdminRepository) {
    this.adminRepository = adminRepository;
  }

  async listAllUsers() {
    const users = await this.adminRepository.findAllUsers();
    return users || [];
  }

  async findUserById(id: string) {
    const user = await this.adminRepository.findUserById(id);
    if (!user) {
      throw new NotFoundError(errorMessages.USER_NOT_FOUND);
    }
    return user;
  }
}
