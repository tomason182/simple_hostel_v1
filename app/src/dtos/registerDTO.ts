export interface registerRequestDTO {
  username: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  propertyName: string;
  acceptTerms: boolean;
  captchaToken: string;
}

export interface registerResponseDTO {
  msg: string;
  token: string;
}
