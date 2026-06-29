import { IUserRepository } from "../domain/ports/IUserRepository";
import { IPropertyRepository } from "../domain/ports/IPropertyRepository";
import { IAccessControlRepository } from "../domain/ports/IAccessControlRepository";
import { jwtTokenGenerator } from "../utils/jwtTokenHelper";
import { IUserService } from "../domain/interfaces/IUserService";

export class UserService implements IUserService {
  userRepository: IUserRepository;
  accessControl: IAccessControlRepository;
  propertyRepository: IPropertyRepository;

  constructor(userRepository: IUserRepository, accessControl: IAccessControlRepository, propertyRepository: IPropertyRepository) {
    this.userRepository = userRepository;
    this.accessControl = accessControl;
    this.propertyRepository = propertyRepository;
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
}

