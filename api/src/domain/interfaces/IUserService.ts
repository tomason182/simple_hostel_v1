export interface IUserService {
  authUser(username: string, password: string): Promise<{ status: number, msg: string }>;

}
