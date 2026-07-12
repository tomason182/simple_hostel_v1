export interface UserDTO {
  id: number;
  username: string;
  firstname: string;
  lastname: string | null;
  hashPassword: string;
  isValidEmail: boolean;
  lastResendEmail: Date;
  role: string;
  avatar: string;
  createdAt: Date;
  updateAt: Date;
}


export interface CreateUserDTO {
  username: string;
  firstname: string;
  lastname?: string;
  password: string;
}
