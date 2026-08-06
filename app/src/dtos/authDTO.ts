export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface LoginResponseDTO {
  id: number,
  username: string;
  firtsName: string;
  lastName: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}
