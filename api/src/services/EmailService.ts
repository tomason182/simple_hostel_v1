import { AccessControl } from "../domain/entities/AccessControl";
import { Property } from "../domain/entities/Property";
import { User } from "../domain/entities/User";
import { IEmailRepositorySMTP } from "../domain/ports/IEmailRepository";
import { jwtTokenGenerator } from "../utils/jwtTokenHelper";

export class EmailService {

  constructor(
    private emailRepository: IEmailRepositorySMTP,
  ) {
    this.emailRepository = emailRepository;
  }

  async validateAccountEmail(user: User, property: Property, accessControl: AccessControl): Promise<void> {
    const tokenData = {
      id: user.getId(),
      propertyId: property.getId(),
      role: accessControl.getRole()
    }

    const token = jwtTokenGenerator(tokenData, 60);

    const confirmationLink = process.env.BASE_URL + "/accounts/validation/" + token;
    const to = user.getUsername();
    const subject = "Confirma tu correo electrónico";
    const templateName = "validate_account";
    const data = {
      name: user.getFirstName(),
      confirmationLink: confirmationLink,
      year: new Date().getFullYear().toString(),
    }

    await this.emailRepository.sendEmail(to, subject, templateName, data);

  }

  public async sendNewPasswordRequest(user: User): Promise<void> {
    const tokenData = {
      id: user.getId()
    };
    const token = jwtTokenGenerator(tokenData, 60);
    const confirmationLink = process.env.BASE_URL + "/account/reset-pass/" + token;
    const to = user.getUsername();
    const subjet = "Solicitud reseteo de contraseña";
    const templateName = "reset_password";
    const data = {
      logoUrl: process.env.LOGO_URL,
      appName: process.env.APP_NAME,
      webkitURL: process.env.WEBSITE_URL,
      name: user.getFirstName(),
      confirmationLink: confirmationLink,
      year: new Date().getFullYear().toString(),
      companyName: process.env.COMPANY_NAME,
      supportEmail: process.env.SUPPORT_EMAIL
    }

    await this.emailRepository.sendEmail(to, subjet, templateName, data)
  }

  async newRegister(to: string, subjetc: string, templateName: string, data: object): Promise<void> {
    await this.emailRepository.sendEmail(to, subjetc, templateName, data);
  }


}
