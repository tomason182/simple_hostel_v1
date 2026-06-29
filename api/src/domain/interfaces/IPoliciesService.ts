import { GeneralPoliciesDTO, MinorPoliciesDTO, OtherPoliciesDTO, PaymentPoliciesDTO } from "../dto/PoliciesDTO";
export interface IPoliciesService {

  updateGeneralPolicies(propertyId: number, userId: number, generalPoliciesDTO: GeneralPoliciesDTO): Promise<{ msg: string }>;
  updateMinorPolicies(propertyId: number, userId: number, MinorPoliciesDTO: MinorPoliciesDTO): Promise<{ msg: string }>;
  updateOtherPolicies(propertyId: number, userId: number, otherPoliciesDTO: OtherPoliciesDTO): Promise<{ msg: string }>;
  updatePaymentPolicies(propertyId: number, userId: number, paymentPoliciesDTO: PaymentPoliciesDTO): Promise<{ msg: string }>;




}

