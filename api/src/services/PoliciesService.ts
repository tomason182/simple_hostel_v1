import { IPoliciesService } from "../domain/interfaces/IPoliciesService";
import { IPoliciesRepository } from "../domain/ports/IPoliciesRepository";
import { IAccessControlRepository } from "../domain/ports/IAccessControlRepository";
import { GeneralPolicies } from "../domain/value-objects/GeneralPolicies";
import { GeneralPoliciesDTO, MinorPoliciesDTO, OtherPoliciesDTO, PaymentPoliciesDTO } from "../domain/dto/PoliciesDTO";
import { MinorPolicies } from "../domain/value-objects/MinorPolicies";
import { OtherPolicies } from "../domain/value-objects/OtherPolicies";
import { PaymentPolicies } from "../domain/value-objects/PaymentPolicies";


export class PoliciesService implements IPoliciesService {
  policiesRepository: IPoliciesRepository;
  accessControlRepository: IAccessControlRepository;

  constructor(policiesRepository: IPoliciesRepository, accessControlRepository: IAccessControlRepository) {
    this.policiesRepository = policiesRepository;
    this.accessControlRepository = accessControlRepository;
  }

  // Policies.
  async updateGeneralPolicies(propertyId: number, userId: number, generalPoliciesDTO: GeneralPoliciesDTO): Promise<{ msg: string; }> {
    const accessControl = await this.accessControlRepository.findUser(userId);

    // Chequear que el rol permita cambios en GeneralPolicies.
    if (!accessControl.canEditPolicies()) {
      throw new Error("PERMITION_DENIED");
    }

    const generalPolicies = GeneralPolicies.fromDTO(generalPoliciesDTO);

    await this.policiesRepository.saveGeneralPolicies(propertyId, generalPolicies);

    return { msg: "PROPERTY_UPDATED_SUCCESFULLY" };

  }

  async updateMinorPolicies(propertyId: number, userId: number, minorPoliciesDTO: MinorPoliciesDTO): Promise<{ msg: string }> {
    const accessControl = await this.accessControlRepository.findUser(userId);

    if (!accessControl.canEditPolicies()) {
      throw new Error("PERMITION_DENIED")
    }

    const minorPolicies = MinorPolicies.fromDTO(minorPoliciesDTO);

    await this.policiesRepository.saveMinorPolicies(propertyId, minorPolicies);

    return { msg: "PROPERTY_UPDATED_SUCCESFULLY" }

  }

  async updateOtherPolicies(propertyId: number, userId: number, otherPoliciesDTO: OtherPoliciesDTO): Promise<{ msg: string }> {
    const accessControl = await this.accessControlRepository.findUser(userId);

    if (!accessControl.canEditPolicies()) {
      throw new Error("PERMITION_DENIED");
    }

    const otherPolicies = OtherPolicies.fromDTO(otherPoliciesDTO);

    await this.policiesRepository.saveOtherPolicies(propertyId, otherPolicies);

    return { msg: "PROPERTY_UPDATED_SUCCESFULLY" }
  }


  async updatePaymentPolicies(propertyId: number, userId: number, paymentPoliciesDTO: PaymentPoliciesDTO): Promise<{ msg: string }> {
    const accessControl = await this.accessControlRepository.findUser(userId);

    if (!accessControl.canEditPolicies()) {
      throw new Error("PERMITION_DENIED");
    }

    const paymentPolicies = PaymentPolicies.fromDTO(paymentPoliciesDTO);

    await this.policiesRepository.savePaymentPolicies(propertyId, paymentPolicies);

    return { msg: "PROPERTY_UPDATED_SUCCESFULLY" };
  }
}
