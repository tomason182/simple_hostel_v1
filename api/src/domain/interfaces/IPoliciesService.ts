import { CancellationPoliciesRequestDTO, CancellationPoliciesResponseDTO } from "../dto/CancellationPoliciesDTO";
import { GeneralPoliciesDTO, MinorPoliciesDTO, OtherPoliciesDTO, PaymentPoliciesDTO } from "../dto/PoliciesDTO";
export interface IPoliciesService {

  saveOrUpdateGeneralPolicies(propertyId: number, userId: number, generalPoliciesDTO: GeneralPoliciesDTO): Promise<GeneralPoliciesDTO>;
  saveOrUpdateMinorPolicies(propertyId: number, userId: number, MinorPoliciesDTO: MinorPoliciesDTO): Promise<MinorPoliciesDTO>;
  saveOrUpdateOtherPolicies(propertyId: number, userId: number, otherPoliciesDTO: OtherPoliciesDTO): Promise<OtherPoliciesDTO>;
  saveOrUpdatePaymentPolicies(propertyId: number, userId: number, paymentPoliciesDTO: PaymentPoliciesDTO): Promise<PaymentPoliciesDTO>;
  saveOrUpdateCancellationPolicies(propertyId: number, userId: number, cancellationPolicies: CancellationPoliciesRequestDTO): Promise<CancellationPoliciesResponseDTO>;




}

