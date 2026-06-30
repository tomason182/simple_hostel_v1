import { GeneralPolicies } from "../value-objects/GeneralPolicies";
import { MinorPolicies } from "../value-objects/MinorPolicies";
import { OtherPolicies } from "../value-objects/OtherPolicies";
import { PaymentPolicies } from "../value-objects/PaymentPolicies";
import { Policies } from "../value-objects/Policies";

export interface IPoliciesRepository {
  findByPropertyId(propertyId: number): Promise<Policies>;

  saveGeneralPolicies(propertyId: number, generalPolicies: GeneralPolicies): Promise<void>;

  saveMinorPolicies(propertyId: number, minorPolicies: MinorPolicies): Promise<void>;

  saveOtherPolicies(propertyId: number, otherPolicies: OtherPolicies): Promise<void>;

  savePaymentPolicies(propertyId: number, paymentPolicies: PaymentPolicies): Promise<void>;

  getPaymentPolicies(propertyId: number): Promise<PaymentPolicies>;

  getGeneralPolicies(propertyId: number): Promise<GeneralPolicies>;

  getMinorPolices(propertyId: number): Promise<MinorPolicies>;

  getOtherPolicies(propertyId: number): Promise<OtherPolicies>;

}
