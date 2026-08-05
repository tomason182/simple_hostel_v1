import { IUserService } from "../domain/interfaces/IUserService";
import { Request, Response, NextFunction } from "express";


export class UserController {
  private readonly userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  // 1. Autentificar usuario
  public async authUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const result = await req.context.execute(async () =>
        this.userService.authUser(username, password),
        false
      )
      res.status(200).json({ token: result.token })
    } catch (e) {
      next(e)
    }
  }

  // 3. Eliminar usuario

  // 4. Actualizar usuario



}
