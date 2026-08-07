import type { LoginRequestDTO, LoginResponseDTO } from "../dtos/authDTO";
import type { registerRequestDTO, registerResponseDTO } from "../dtos/registerDTO";
import { ApiError } from "../error/ApiError";


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

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.code,
        data.errors
      )
    }
    return data;

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
      console.log(data)
      throw new ApiError(
        data.code,
        data.errors
      )
    }

    return data
  }

}


