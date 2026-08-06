import type { LoginRequestDTO, LoginResponseDTO } from "../dtos/authDTO";


export class AuthRepository {
  private baseUrl: string = "http://localhost:3000";

  public async login(dto: LoginRequestDTO): Promise<LoginResponseDTO> {
    const url = this.baseUrl + "/login";
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
      throw new Error("Credenciales inválidas");
    }
    return await response.json();

  }

}



