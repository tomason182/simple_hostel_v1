export interface UserDTO {
  id: number;
  username: string;
  firstName: string;
  lastName: string | null;
  hashPassword: string;
  isValidEmail: boolean;
  lastResendEmail: Date;
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

export interface UserOutputDTO {
  id: number;
  username: string;
  firstName: string;
  lastName: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}
