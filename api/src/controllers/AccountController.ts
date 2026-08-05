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
      const { username, password, firstName, propertyName } = req.body;

      const result = await req.context.execute(async () =>
        this.accountService.createAccount(username, password, firstName, propertyName)
        , true)

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }

  }

  // 2. Validar cuenta.
  public async validateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.params.token as string;

      const result = await req.context.execute(async () =>
        this.accountService.validateAccount(token),
        false
      );

      return res.status(200).json(result);
    } catch (err) {
      next(err)
    }
  }

  // 3. Reenviar email de validacion.
  public async resendValidationEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const result = await this.accountService.resendValidationEmail(email);

      return res.status(200).json(result);

    } catch (err) {
      next(err);
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
