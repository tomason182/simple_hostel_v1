import { GeneralPoliciesDTO, MinorPoliciesDTO, OtherPoliciesDTO, PaymentPoliciesDTO } from "../dto/PoliciesDTO";
export interface IPoliciesService {

  saveOrUpdateGeneralPolicies(userId: number, generalPoliciesDTO: GeneralPoliciesDTO): Promise<GeneralPoliciesDTO>;
  saveOrUpdateMinorPolicies(userId: number, MinorPoliciesDTO: MinorPoliciesDTO): Promise<MinorPoliciesDTO>;
  saveOrUpdateOtherPolicies(userId: number, otherPoliciesDTO: OtherPoliciesDTO): Promise<OtherPoliciesDTO>;
  saveOrUpdatePaymentPolicies(userId: number, paymentPoliciesDTO: PaymentPoliciesDTO): Promise<PaymentPoliciesDTO>;




}

