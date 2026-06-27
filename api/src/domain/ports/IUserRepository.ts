import { User } from "../entities/User";

export interface IUserRepository {

  findByUsername(username: string): Promise<User>;

  save(user: User): Promise<void>;

  findById(id: number): Promise<User>;

  validateEmail(id: number): Promise<void>

  updateLastResendEmail(user: User): Promise<void>;
}
