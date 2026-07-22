export interface IAccountService {
  createAccount(username: string, password: string, firstname: string, propertyName: string): Promise<{ msg: string }>;

  validateAccount(token: string): Promise<{ msg: string }>;

  resendValidationEmail(email: string): Promise<void>;

  deleteAccount(username: string, password: string): Promise<{ msg: string }>
}
