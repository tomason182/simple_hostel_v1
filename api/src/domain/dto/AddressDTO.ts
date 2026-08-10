export interface AddressDTO {
  houseNumber: string;
  street: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
  alpha2code: string;
  lat: number;
  lon: number;
  osmId: string;
}

export interface AddressResponseDTO {
  houseNumber: string;
  street: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
  alpha2code: string;
  lat: number;
  lon: number;
  osmId: string;
  updatedAt: Date;
  updatedBy: number;
}
