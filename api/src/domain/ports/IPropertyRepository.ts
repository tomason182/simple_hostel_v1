import { Property } from "../entities/Property";
import { Address } from "../value-objects/Address";
import { ContactInfo } from "../value-objects/ContactInfo";
import { GeneralPolicies } from "../value-objects/GeneralPolicies";
import { MinorPolicies } from "../value-objects/MinorPolicies";
import { OtherPolicies } from "../value-objects/OtherPolicies";
import { PaymentPolicies } from "../value-objects/PaymentPolicies";
import { Policies } from "../value-objects/Policies";

export interface IPropertyRepository {
  save(property: Property): Promise<Property>;

  findById(property: number): Promise<Property>;

  updateDescription(property: Property): Promise<void>;

  // Contact info
  getContactInfo(propertyId: number): Promise<ContactInfo | null>;
  saveContactInfo(propertyId: number, contactInfo: ContactInfo): Promise<void>;

  // Address
  getAddress(propertyId: number): Promise<Address>;
  saveAddress(propertyId: number, address: Address): Promise<Address>;

  // Policies
  getPolicies(propertyId: number): Promise<Policies>

  getGeneralPolicies(propertyId: number): Promise<GeneralPolicies>;
  saveGeneralPolicies(propertyId: number, general: GeneralPolicies): Promise<GeneralPolicies>;

  getPaymentPolicies(propertyId: number): Promise<PaymentPolicies>;
  savePayementPolicies(propertyId: number, paymentPolicies: PaymentPolicies): Promise<PaymentPolicies>;

  getMinorPolicies(propertyId: number): Promise<MinorPolicies>;
  saveMinorPolicies(propertyId: number, minorPolicies: MinorPolicies): Promise<MinorPolicies>;

  getOtherPolicies(propertyId: number): Promise<OtherPolicies>;
  saveOtherPolicies(propertyId: number, otherPolicies: OtherPolicies): Promise<OtherPolicies>;



}
