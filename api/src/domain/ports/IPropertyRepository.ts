import { Property } from "../entities/Property";
import { ContactInfo } from "../value-objects/ContactInfo";

export interface IPropertyRepository {
  save(property: Property): Promise<void>;

  findPropertyDetails(propertyId: number): Promise<Property>;

  findById(property: number): Promise<Property>;

  updateDescription(property: Property): Promise<void>;

  // Contact info
  getContactInfo(propertyId: number): Promise<ContactInfo>;
  saveContactInfo(propertyId: number, contactInfo: ContactInfo): Promise<void>

}
