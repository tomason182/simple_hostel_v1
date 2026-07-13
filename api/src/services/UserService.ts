import { IUserRepository } from "../domain/ports/IUserRepository";
import { IPropertyRepository } from "../domain/ports/IPropertyRepository";
import { IAccessControlRepository } from "../domain/ports/IAccessControlRepository";
import { jwtTokenGenerator, jwtTokenValidator } from "../utils/jwtTokenHelper";
import { IUserService } from "../domain/interfaces/IUserService";
import { UserDTO } from "../domain/dto/UserDTO";
import { User } from "../domain/entities/User";
import { EmailService } from "./EmailService";

export class UserService implements IUserService {
  userRepository: IUserRepository;
  accessControl: IAccessControlRepository;
  propertyRepository: IPropertyRepository;
  emailService: EmailService;

  constructor(userRepository: IUserRepository, accessControl: IAccessControlRepository, propertyRepository: IPropertyRepository, emailService: EmailService) {
    this.userRepository = userRepository;
    this.accessControl = accessControl;
    this.propertyRepository = propertyRepository;
    this.emailService = emailService;
  }

  async authUser(username: string, password: string): Promise<{ token: string }> {

    // 1. Buscar el usuario por username
    const user = await this.userRepository.findByUsername(username);

    // 2. Validr que el usauario existe.
    if (user === null || user.isEmailVerified === false) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const userId = user.getId();

    // 3. Obtener el accessControl.
    const accessControl = await this.accessControl.findUser(userId);

    // 4. Obtener propertyId y role.
    const propertyId = accessControl.getPropertyId();
    const role = accessControl.getRole();

    // 5. Buscar la propriedad para validar su estado,
    const property = await this.propertyRepository.findById(propertyId);

    if (property.isPropertyActive() === false) {
      throw new Error("INVALID_CREDENTIALS");
    }

    // 6. Comprobar password
    if (!user.comparePassword(password)) {
      throw new Error("INVALID_CREDENTIALS")
    }

    // 5. Generar credenciales.
    const data = { userId, propertyId, role };

    const token = jwtTokenGenerator(data, 60);

    return { token: token }
  };

  public async update(userDTO: UserDTO): Promise<UserDTO> {


    let user = await this.userRepository.findById(userDTO.id);
    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    user.update(userDTO);

    await this.userRepository.save(user);

    return userDTO;
  }

  public async changePass(userId: number, currentPass: string, newPass: string, repeatNewPass: string): Promise<{ msg: string }> {
    let user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    await user.changePassword(currentPass, newPass, repeatNewPass);

    await this.userRepository.save(user);

    return { msg: "PASSWORD_UPDATED" };
  }

  public async requestNewPass(username: string): Promise<{ msg: string }> {
    // 1. Buscar al usuario por email
    let user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    // 2. Chequear que el email este validado.
    if (!user.isEmailVerified) {
      throw new Error("USER_NOT_FOUND");
    }

    // 3. Comprobar y setear periodo de espera.
    user.checkLastResendEmail();

    // 4. Enviar email de restauracion.
    await this.emailService.sendNewPasswordRequest(user);

    // 5. Setear periodo de espera.
    user.setLastResenEmail();

    await this.userRepository.save(user);

    return { msg: "EMAIL_SENT" }
  }

  public async resetPass(token: string, newPass: string, repeatNewPass: string): Promise<{ msg: "PASSWORD_UPDATED" }> {
    const decoded = jwtTokenValidator(token);

    if (!decoded || !decoded.sub) {
      throw new Error("INVALID_OR_EXPIRED_TOKEN");
    }

    const data = decoded.sub;
    const userId = data.id

    let user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    };

    await user.resetPassword(newPass, repeatNewPass)

    return { msg: "PASSWORD_UPDATED" }

  }


}
