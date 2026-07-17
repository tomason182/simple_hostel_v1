import { GeneralPolicies } from "../value-objects/GeneralPolicies";
import { MinorPolicies } from "../value-objects/MinorPolicies";
import { OtherPolicies } from "../value-objects/OtherPolicies";
import { PaymentPolicies } from "../value-objects/PaymentPolicies";
import { Policies } from "../value-objects/Policies";

export interface IPoliciesRepository {
  getPolicies(propertyId: number): Promise<Policies>;

  getGeneralPolicies(propertyId: number): Promise<GeneralPolicies>;
  saveGeneralPolicies(generalPolicies: GeneralPolicies): Promise<GeneralPolicies>;

  getMinorPolicies(propertyId: number): Promise<MinorPolicies>;
  saveMinorPolicies(minorPolicies: MinorPolicies): Promise<MinorPolicies>;

  getOtherPolicies(propertyId: number): Promise<OtherPolicies>;
  saveOtherPolicies(otherPolicies: OtherPolicies): Promise<OtherPolicies>;

  getPaymentPolicies(propertyId: number): Promise<PaymentPolicies>;
  savePaymentPolicies(paymentPolicies: PaymentPolicies): Promise<PaymentPolicies>;

}
