import { Request, Response, NextFunction } from "express";
import { IAccountService } from "../domain/interfaces/IAccountService"


export class AccountController {
  private readonly accountService: IAccountService;

  constructor(accountService: IAccountService) {
    this.accountService = accountService;
  }

  // 1. Crear cuenta.
  public async createAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, firstname, propertyName } = req.body;

      const result = await this.accountService.createAccount(username, password, firstname, propertyName);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }

  }

  // 2. Validar cuenta.
  public async validateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body;

      const result = await this.accountService.validateAccount(token);

      return res.status(200).json(result);
    } catch (err) {
      next(err)
    }
  }

  // 2. Eliminar cuenta.
  public async DeleteAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const result = await this.accountService.deleteAccount(username, password);

      return res.status(200).json({ msg: result });

    } catch (err) {
      next(err);
    }
  }
}
