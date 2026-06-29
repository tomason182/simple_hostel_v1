import { User } from "../domain/entities/User";
import { Property } from "../domain/entities/Property";
import { AccessControl } from "../domain/entities/AccessControl";
import { IPropertyRepository } from "../domain/ports/IPropertyRepository";
import { IUserRepository } from "../domain/ports/IUserRepository";
import { IAccessControlRepository } from "../domain/ports/IAccessControlRepository";
import { EmailService } from "../services/EmailService";
import { IAccountService } from "../domain/interfaces/IAccountService";

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
    const user = await User.createNewUser(username, password, firstname);

    // 3. Guardar el usuario en la base de datos.
    await this.userRepository.save(user);

    // 4. Crear la entidad Property.
    const property = Property.createNewProperty(propertyName);

    // 5. Guardar la propiedad en la bd.
    await this.propertyRepository.save(property);

    // 6. Crear la entidad AccessControl.
    const accessControl = AccessControl.createNewAccessControl(user.getId(), property.getId());

    // 7. Guardar el accessControl.
    await this.accessControlRepository.save(accessControl);

    // 8. Enviar email para validar cuenta.
    await this.emailService.validateAccountEmail(user, property, accessControl);

    return {

      msg: "USER_REGISTER_SUCCESSFULLY"
    }
  }

  async deleteAccount(username: string, password: string): Promise<{ msg: string; }> {

    // TODO. logica para eliminar cuenta.

    return { msg: "ACCOUNT_DELETED" };
  }
} 
