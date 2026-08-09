import { AccessControlDTO } from "../dto/AccessControlDTO";
import { UserOutputDTO } from "../dto/UserDTO";

export interface IUserService {
  authUser(username: string, password: string): Promise<{ token: string, expiresIn: number, user: UserOutputDTO, accessControl: AccessControlDTO }>;

}
