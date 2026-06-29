import { Request, Response, NextFunction } from "express";
import { IAccountService } from "../domain/interfaces/IAccountService"


export class AccountService {
  private readonly accountService: IAccountService;

  constructor(accountService: IAccountService) {
    this.accountService = accountService;
  }

  // 1. Crear cuenta.
  public async CreateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, firstname, propertyName } = req.body;

      const result = await this.accountService.createAccount(username, password, firstname, propertyName);

      return res.status(200).json({ msg: result });
    } catch (err) {
      next(err);
    }

  }
}
