export interface GuestResponseDTO {
  id: number;
  propertyId: number;
  firstName: string;
  lastName: string;
  idNumber: string;
  email: string;
  phoneNumber: string;
  phoneCode: string;
  street: string;
  city: string;
  country: string;
  alpa2code: string;

  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}

export interface GuestRequestDTO {
  id: number | null;
  firstName: string;
  lastName: string;
  idNumber: string;
  email: string;
  phoneNumber: string;
  phoneCode: string;
  street: string;
  city: string;
  country: string;
  alpa2code: string;
}
