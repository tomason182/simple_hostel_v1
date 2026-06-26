import User from "../entities/User";


export class IUserService {
  
  authUser(username:string, password:string):Promise<User>

}
