import { Property } from "../entities/Property";

export interface IPropertyRepository {
  save(property: Property): Promise<void>;

  findPropertyDetails(propertyId: number): Promise<Property>;

  findById(property: number): Promise<Property>;

  updateDescription(property: Property): Promise<void>;
}
