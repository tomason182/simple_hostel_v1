import { CurrenciesDTO } from "../dto/CurrenciesDTO";
import { Property, PropertyStatus } from "../entities/Property";
import { Address } from "../value-objects/Address";
import { ContactInfo } from "../value-objects/ContactInfo";
import { Currencies } from "../value-objects/Currencies";

export interface IPropertyRepository {
  save(property: Property): Promise<Property>;

  findById(property: number): Promise<Property>;


  update(property: Property): Promise<Property>;

  // Contact info
  getContactInfo(propertyId: number): Promise<ContactInfo | null>;
  saveContactInfo(propertyId: number, contactInfo: ContactInfo): Promise<void>;

  // Address
  getAddress(propertyId: number): Promise<Address | null>;
  saveAddress(propertyId: number, address: Address): Promise<void>;

  // Currencies
  getCurrencies(propertyId: number): Promise<Currencies | null>;
  saveCurrencies(currencies: Currencies): Promise<Currencies>
}
