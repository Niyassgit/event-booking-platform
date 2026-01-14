import { errorMessages, successMessages } from "../../utils/messages";
import { IUserRepository } from "./interfaces/IUserRepository";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async getAllServices() {
    const services = await this.userRepository.getServices();
    return services || [];
  }

  async bookService(serviceId: string) {
    const updated = await this.userRepository.BookService(serviceId);
    return updated
      ? successMessages.SERVICE_BOOKED
      : errorMessages.BOOKING_FAILED;
  }
}
