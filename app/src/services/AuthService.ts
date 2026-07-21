import apiClient from "../api/ApiClient";

import type { LoginInputDTO } from "../dto/auth/LoginInputDTO";
import type { LoginOutputDTO } from "../dto/auth/LoginInputDTO";
import type { User } from "../models/User";


class AuthService {
  async login(dto: LoginInputDTO): Promise<LoginOutputDTO> {
    return await apiClient.post<LoginInputDTO, LoginOutputDTO>("/auth/login", dto);
  }

  async me(): Promise<User> {
    return apiClient.get<User>("/auth/me")
  }
}

export default new AuthService();
