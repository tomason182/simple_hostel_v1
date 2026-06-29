export interface IUserService {
  authUser(username: string, password: string): Promise<{ token: string }>;

}
