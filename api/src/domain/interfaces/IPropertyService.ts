import { AddressDTO } from "../dto/AddressDTO";
import { ContactInfoDTO } from "../dto/ContactInfoDTO";
import { CurrenciesDTO } from "../dto/CurrenciesDTO";
import { GeneralPoliciesDTO, MinorPoliciesDTO, OtherPoliciesDTO, PaymentPoliciesDTO, PoliciesDTO } from "../dto/PoliciesDTO";
import { UserRole } from "../entities/AccessControl";
import { ContactInfo } from "../value-objects/ContactInfo";

export interface IPropertyService {
  // facilities
  // getFacilities(propertyId: number): Promise<Array<number>>;
  // updateFacilities(facilities: Array<number>): Promise<{ msg: string }>;

  // ContactInfo.
  getContactInfo(propertyId: number): Promise<ContactInfoDTO>;
  saveAndUpdateContactInfo(propertyId: number, userId: number, contactInfoDTO: ContactInfoDTO): Promise<ContactInfoDTO>

  // Address.
  getAddress(propertyId: number): Promise<AddressDTO>;
  saveAndUpdateAddress(propertyId: number, userId: number, addressDTO: AddressDTO): Promise<AddressDTO>;

  // Currencies.
  // getCurrencies(propertyId: number): Promise<CurrenciesDTO>;
  // updateCurrencies(propertyId: number, userId: number, userRole: UserRole, currenciesDTO: CurrenciesDTO): Promise<{ msg: string }>;
}
