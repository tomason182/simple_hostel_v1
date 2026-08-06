import type { LoginRequestDTO, LoginResponseDTO } from "../dtos/authDTO";
import type { registerRequestDTO, registerResponseDTO } from "../dtos/registerDTO";


export class AuthRepository {
  private baseUrl: string = "http://localhost:3000/api/v1";

  public async login(dto: LoginRequestDTO): Promise<LoginResponseDTO> {
    const url = this.baseUrl + "/users/auth";
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dto)
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      console.log(await response.json())
      throw new Error("Credenciales inválidas");
    }
    return await response.json();

  }

  public async register(dto: registerRequestDTO): Promise<registerResponseDTO> {
    const url = this.baseUrl + "/accounts/create-account";

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dto)
    };

    const response = await fetch(url, options);

    const data = await response.json()

    if (!response.ok) {
      console.log(data);
      throw new Error("Error al registar usuario")
    }

    return data
  }

}


