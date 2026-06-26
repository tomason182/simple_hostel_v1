import { User } from "../entities/User";

export interface IUserRepository {

  findByUsername(username: string): Promise<User>
  save(user: User): Promise<void>
}
