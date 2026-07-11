import { AddressDTO } from "../dto/AddressDTO";
import { ContactInfoDTO } from "../dto/ContactInfoDTO";
import { CurrenciesDTO } from "../dto/CurrenciesDTO";
import { UserRole } from "../entities/AccessControl";

export interface IPropertyService {
  // facilities
  getFacilities(propertyId: number): Promise<Array<number>>;
  updateFacilities(facilities: Array<number>): Promise<{ msg: string }>;

  // ContactInfo.
  getContactInfo(propertyId: number): Promise<ContactInfoDTO>;
  saveContactInfo(propertyId: number, userId: number, userRole: UserRole, contactInfoDTO: ContactInfoDTO): Promise<{ msg: string }>

  // Address.
  getAddress(propertyId: number): Promise<AddressDTO>;
  saveAddress(propertyId: number, userId: number, userRole: UserRole, addressDTO: AddressDTO): Promise<AddressDTO>;

  // Currencies.
  getCurrencies(propertyId: number): Promise<CurrenciesDTO>;
  updateCurrencies(propertyId: number, userId: number, userRole: UserRole, currenciesDTO: CurrenciesDTO): Promise<{ msg: string }>;
}
