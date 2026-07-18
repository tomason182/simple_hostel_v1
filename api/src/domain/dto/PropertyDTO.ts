import { AddressDTO } from "./AddressDTO";
import { ContactInfoDTO } from "./ContactInfoDTO";
import { PoliciesDTO } from "./PoliciesDTO";
import { CurrenciesDTO } from "./CurrenciesDTO";
import type { PropertyStatus } from "../entities/Property";


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

export interface PropertyBasis {
  id: number;
  propertyName: string;
  description: string;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
  status: PropertyStatus;
}


