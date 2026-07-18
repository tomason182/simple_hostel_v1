import { AddressDTO } from "../dto/AddressDTO";
import { ContactInfoDTO } from "../dto/ContactInfoDTO";
import { CurrenciesDTO } from "../dto/CurrenciesDTO";
import { Property } from "../entities/Property";

export interface IPropertyService {

  getProperty(propertyId: number): Promise<Property>;

  // facilities
  // getFacilities(propertyId: number): Promise<Array<number>>;
  // updateFacilities(facilities: Array<number>): Promise<{ msg: string }>;

  // ContactInfo.
  getContactInfo(propertyId: number): Promise<ContactInfoDTO>;
  saveOrUpdateContactInfo(propertyId: number, userId: number, contactInfoDTO: ContactInfoDTO): Promise<ContactInfoDTO>

  // Address.
  getAddress(propertyId: number): Promise<AddressDTO>;
  saveOrUpdateAddress(propertyId: number, userId: number, addressDTO: AddressDTO): Promise<AddressDTO>;

  // Currencies.
  // getCurrencies(propertyId: number): Promise<CurrenciesDTO>;
  saveOrUpdateCurrencies(currenciesDTO: CurrenciesDTO): Promise<CurrenciesDTO>;
}
