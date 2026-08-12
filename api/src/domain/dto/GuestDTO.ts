export interface GuestResponseDTO {
  id: number;
  propertyId: number;
  firstName: string;
  lastName: string;
  idNumber: string | null;
  email: string;
  phoneNumber: string;
  phoneCode: string;
  street: string | null;
  city: string | null;
  country: string | null;
  alpa2code: string | null;

  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}

export interface GuestRequestDTO {
  id: number | null;
  firstName: string;
  lastName: string;
  idNumber: string | null;
  email: string;
  phoneNumber: string;
  phoneCode: string;
  street: string | null;
  city: string | null;
  country: string | null;
  alpa2code: string | null;
}
