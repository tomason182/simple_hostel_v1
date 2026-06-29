import { AddressDTO } from "../dto/AddressDTO";
import { ContactInfoDTO } from "../dto/ContactInfoDTO";
import { CurrenciesDTO } from "../dto/CurrenciesDTO";
import { MinorPoliciesDTO, PoliciesDTO, GeneralPoliciesDTO, OtherPoliciesDTO, PaymentPoliciesDTO } from "../dto/PoliciesDTO";
import { UserRole } from "../entities/AccessControl";

export interface IPropertyService {
  // facilities
  getFacilities(propertyId: number): Promise<Array<number>>;
  updateFacilities(facilities: Array<number>): Promise<{ msg: string }>;

  // policies.
  getPolicies(propertyId: number): Promise<PoliciesDTO>;

  updateGeneralPolicies(propertyId: number, userId: number, userRole: UserRole, generalPolicies: GeneralPoliciesDTO): Promise<{ msg: string }>;
  updateMinorPolicies(propertyId: number, userId: number, userRole: UserRole, minorPolicies: MinorPoliciesDTO): Promise<{ msg: string }>;
  updateOtherPolicies(propertyId: number, userId: number, userRole: UserRole, otherPolicies: OtherPoliciesDTO): Promise<{ msg: string }>;
  updatePaymentPolicies(propertyId: number, userId: number, userRole: UserRole, paymentPolicies: PaymentPoliciesDTO): Promise<{ msg: string }>;

  // ContactInfo.
  getContactInfo(propertyId: number): Promise<ContactInfoDTO>;
  updateContactInfo(propertyId: number, userId: number, userRole: UserRole, contactInfo: ContactInfoDTO): Promise<{ msg: string }>

  // Address.
  getAddress(propertyId: number): Promise<AddressDTO>;
  updateAddress(propertyId: number, userId: number, userRole: UserRole, address: AddressDTO): Promise<AddressDTO>;

  // Currencies.
  getCurrencies(propertyId: number): Promise<CurrenciesDTO>;
  updateCurrencies(propertyId: number, userId: number, userRole: UserRole, currencies: CurrenciesDTO): Promise<{ msg: string }>;
}
