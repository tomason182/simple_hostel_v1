import { AddressDTO } from "./AddressDTO";
import { ContactInfoDTO } from "./ContactInfoDTO";
import { PoliciesDTO } from "./PoliciesDTO";
import { CurrenciesDTO } from "./CurrenciesDTO";


export interface CreatePropertyDTO {
  propertyName: string,
}

export interface PropertyDTO {
  id: number;
  propertyName: string;
  description: string;
  address: AddressDTO;
  contactInfo: ContactInfoDTO;
  policies: PoliciesDTO;
  currencies: CurrenciesDTO;
  createdAt: Date;
  updatedAt: Date;
}


