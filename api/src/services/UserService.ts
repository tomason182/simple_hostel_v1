import { IUserRepository } from "../domain/interfaces/IUserRepository";
import { IUserService } from "../domain/interfaces/IUserService";

export class UserService implements IUserService {
  userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async authUser(username: string, password: string): Promise<{ status: number, msg: string }> {

    // 1. Buscar el usuario por username
    const user = await this.userRepository.findByUsername(username);

    // 2. Validar que el email fue verificado
    if (!user.isEmailVerified) {
      throw new Error("INVALID_CREDENTIALS")
    }

    // 3. Verificar estado de la cuenta. active |  suspended | blocked | pending

    // 4. Comprobar password
    if (!user.comparePassword) {
      throw new Error("INVALID_CREDENTIALS")
    }

    // 5. Generar credenciales.

    return { status: 200, msg: "prueba" }


  };
}

