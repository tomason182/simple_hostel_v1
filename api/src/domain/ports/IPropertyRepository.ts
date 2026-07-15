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

  findById(property: number): Promise<Property | null>;

  updateDescription(property: Property): Promise<void>;

  // Contact info
  getContactInfo(propertyId: number): Promise<ContactInfo | null>;
  saveContactInfo(propertyId: number, contactInfo: ContactInfo): Promise<void>;

  // Address
  getAddress(propertyId: number): Promise<Address | null>;
  saveAddress(propertyId: number, address: Address): Promise<void>;

  // Policies
  getPolicies(propertyId: number): Promise<Policies | null>

  getGeneralPolicies(propertyId: number): Promise<GeneralPolicies | null>;
  saveGeneralPolicies(propertyId: number, general: GeneralPolicies): Promise<void>;

  getPaymentPolicies(propertyId: number): Promise<PaymentPolicies | null>;
  savePaymentPolicies(propertyId: number, paymentPolicies: PaymentPolicies): Promise<void>;

  getMinorPolicies(propertyId: number): Promise<MinorPolicies | null>;
  saveMinorPolicies(propertyId: number, minorPolicies: MinorPolicies): Promise<void>;

  getOtherPolicies(propertyId: number): Promise<OtherPolicies | null>;
  saveOtherPolicies(propertyId: number, otherPolicies: OtherPolicies): Promise<void>;



}
