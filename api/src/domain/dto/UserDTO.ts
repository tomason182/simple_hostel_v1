export type UserStatus = "pending" | "active" | "blocked" | "suspended";

export interface UserDTO {
  id?: number;
  username: string;
  firstname: string;
  lastname?: string;
  hashPassword: string;
  isValidEmail: boolean;
  lastResendEmail: Date;
  role: string;
  avatar: string;
  status: UserStatus;
  createdAt: Date;
  updateAt: Date;
}


export interface CreateUserDTO {
  username: string;
  firstname: string;
  lastname?: string;
  password: string;
}
