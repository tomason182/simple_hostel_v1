import { User } from "../domain/entities/User";
import { Property } from "../domain/entities/Property";
import { AccessControl } from "../domain/entities/AccessControl";
import { IPropertyRepository } from "../domain/ports/IPropertyRepository";
import { IUserRepository } from "../domain/ports/IUserRepository";
import { IAccessControlRepository } from "../domain/ports/IAccessControlRepository";
import { EmailService } from "../services/EmailService";
import { IAccountService } from "../domain/interfaces/IAccountService";
import { jwtTokenValidator } from "../utils/jwtTokenHelper";

export class AccountService implements IAccountService {
  constructor(
    private userRepository: IUserRepository,
    private propertyRepository: IPropertyRepository,
    private accessControlRepository: IAccessControlRepository,
    private emailService: EmailService
  ) {
    this.userRepository = userRepository;
    this.propertyRepository = propertyRepository;
    this.accessControlRepository = accessControlRepository;
    this.emailService = emailService;
  };

  async createAccount(username: string, password: string, firstname: string, propertyName: string): Promise<{ msg: string }> {
    // 1. Comprobar si el usuario existe.
    const userExist = await this.userRepository.findByUsername(username);

    if (userExist !== null) {
      throw new Error("USER_EXIST");
    }

    // 2. Crear la entidad User.
    let user = await User.createNewUser(username, password, firstname);

    // 3. Guardar el usuario en la base de datos.
    user = await this.userRepository.save(user);

    // 4. Crear la entidad Property.
    let property = Property.createNewProperty(propertyName);

    // 5. Guardar la propiedad en la bd.
    property = await this.propertyRepository.save(property);

    // 6. Crear la entidad AccessControl.
    let accessControl = AccessControl.createNewAccessControl(user.getId(), property.getId());

    // 7. Guardar el accessControl.
    accessControl = await this.accessControlRepository.save(accessControl);

    // 8. Enviar email para validar cuenta.
    await this.emailService.validateAccountEmail(user, property, accessControl);

    return {
      msg: "USER_REGISTER_SUCCESS"
    }
  }

  async validateAccount(token: string): Promise<{ msg: string }> {
    const decoded = jwtTokenValidator(token);
    if (!decoded) {
      throw new Error("INVALID_OR_EXPIRED_TOKEN");
    }

    const id = decoded.data.id;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    if (user.isEmailVerified) {
      throw new Error("ACCOUNT_ALREADY_VALIDATED");
    }

    user.checkLastResendEmail();

    // No tiene sentido hacer aca user.isEmailVerified = true, porque lo hace la bd.
    user.isEmailVerified = true;

    // ¿Habria que setear el nuevo lastReserndEmail y guardarlo en la bd?.


    // Actualzar solamente validateEmail
    await this.userRepository.validateEmail(user.getId());

    // Auto enviarme un email de aviso de registro.
    const to = process.env.SUPPORT_EMAIL || "support@simplehostel.net";
    const subject = "Se registro un nuevo hostel";
    const templateName = "new_register";
    const data = {
      logoUrl: process.env.LOGO_URL || "",
      name: user.getFirstName(),
      email: user.getUsername(),
    };

    await this.emailService.newRegister(to, subject, templateName, data);

    return { msg: "ACCOUNT_VALIDATED" }
  }

  async resendValidationEmail(email: string): Promise<void> {

    return;
  }

  async deleteAccount(username: string, password: string): Promise<{ msg: string; }> {

    // TODO. logica para eliminar cuenta.

    return { msg: "ACCOUNT_DELETED" };
  }
} 
