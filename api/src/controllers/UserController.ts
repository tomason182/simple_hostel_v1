import IUserService from "../domain/interfaces/IUserService";

export class UserController {
  userService:IUserService;

  constructor(userService:IUserService) {
    this.userService = userService;
  }

  // 1. Registrar usuario
  
  // 2. Autentificar usuario
  private async authUser(req, res, next) {
    try {
      const {username, password } = req.body;

      const result = await this.userService.authUser(username, password);
    }catch(e){

    }
  }

  // 3. Eliminar usuario
  
  // 4. Actualizar usuario



}
