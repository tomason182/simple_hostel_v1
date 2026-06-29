import { User } from "../domain/entities/User";
import { Property } from "../domain/entities/Property";
import { AccessControl } from "../domain/entities/AccessControl";
import { IPoliciesRepository } from "../domain/ports/IPoliciesRepository";
import { IPropertyRepository } from "../domain/ports/IPropertyRepository";
import { IUserRepository } from "../domain/ports/IUserRepository";
import { IAccessControlRepository } from "../domain/ports/IAccessControlRepository";
import { EmailServiceSMTP } from "../infraestructure/email/EmailServiceSMTP";
import { CreateUserDTO } from "../domain/dto/UserDTO";
import { CreatePropertyDTO } from "../domain/dto/PropertyDTO";

export class RegistrationService {
  constructor(
    private userRepository: IUserRepository,
    private propertyRepository: IPropertyRepository,
    private accessControl: IAccessControlRepository,
    private emailService: EmailServiceSMTP
  ) {
    this.userRepository = userRepository;
    this.propertyRepository = propertyRepository;
    this.accessControl = accessControl;
    this.emailService = emailService;
  };

  async register(userDTO: CreateUserDTO, propertyDTO: CreatePropertyDTO): Promise<{ status: string, msg: string }> {
    // 1. Comprobar si el usuario existe.
    const userExist = await this.userRepository.findByUsername(userDTO.username);

    if (userExist !== null) {
      throw new Error("USER_EXIST");
    }

    // 2. Crear la entidad User.
    const user = await User.fromCreateUserDTO(userDTO);

    // 3. Guardar el usuario en la base de datos.:while (condition)
    await this.userRepository.save(user);

    // 4. Crear la entidad Property.
    const property = Property.fromCreatePropertyDTO(propertyDTO)

    // 5. Guardar la propiedad en la bd.
    await this.propertyRepository.save(property);


    return {
      status: "ok",
      msg: "USER_REGISTER_SUCCESSFULLY"
    }
  }
} 
