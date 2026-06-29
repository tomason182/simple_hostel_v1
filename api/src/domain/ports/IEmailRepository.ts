export interface IEmailRepositorySMTP {
  sendEmail(to: string, subject: string, templaName: string, data: object): Promise<void>;
}
