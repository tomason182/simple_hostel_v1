import { IPoliciesService } from "../domain/interfaces/IPoliciesService";
import { IPoliciesRepository } from "../domain/ports/IPoliciesRepository";
import { IAccessControlRepository } from "../domain/ports/IAccessControlRepository";
import { GeneralPolicies } from "../domain/value-objects/GeneralPolicies";
import { GeneralPoliciesDTO, MinorPoliciesDTO, OtherPoliciesDTO, PaymentPoliciesDTO } from "../domain/dto/PoliciesDTO";
import { MinorPolicies } from "../domain/value-objects/MinorPolicies";
import { OtherPolicies } from "../domain/value-objects/OtherPolicies";
import { PaymentPolicies } from "../domain/value-objects/PaymentPolicies";
import { CancellationPoliciesRequestDTO, CancellationPoliciesResponseDTO } from "../domain/dto/CancellationPoliciesDTO";
import { AppError } from "../errors/AppError";
import { CancellationPolicies } from "../domain/value-objects/CancellationPolicies";


export class PoliciesService implements IPoliciesService {
  policiesRepository: IPoliciesRepository;
  accessControlRepository: IAccessControlRepository;

  constructor(policiesRepository: IPoliciesRepository, accessControlRepository: IAccessControlRepository) {
    this.policiesRepository = policiesRepository;
    this.accessControlRepository = accessControlRepository;
  }

  // Policies.
  async saveOrUpdateGeneralPolicies(propertyId: number, userId: number, generalPoliciesDTO: GeneralPoliciesDTO): Promise<GeneralPoliciesDTO> {
    const accessControl = await this.accessControlRepository.findUser(userId);

    // Chequear que el rol permita cambios en GeneralPolicies.
    if (!accessControl.canEditPolicies()) {
      throw new Error("PERMITION_DENIED");
    }

    let generalPolicies = GeneralPolicies.fromDTO(generalPoliciesDTO, userId, propertyId);

    generalPolicies = await this.policiesRepository.saveGeneralPolicies(generalPolicies);

    return generalPolicies.toDTO();

  }

  async saveOrUpdateMinorPolicies(propertyId: number, userId: number, minorPoliciesDTO: MinorPoliciesDTO): Promise<MinorPoliciesDTO> {
    const accessControl = await this.accessControlRepository.findUser(userId);

    if (!accessControl.canEditPolicies()) {
      throw new Error("PERMITION_DENIED")
    }

    let minorPolicies = MinorPolicies.fromDTO(minorPoliciesDTO, userId, propertyId);

    minorPolicies = await this.policiesRepository.saveMinorPolicies(minorPolicies);

    return minorPolicies.toDTO();

  }

  async saveOrUpdateOtherPolicies(propertyId: number, userId: number, otherPoliciesDTO: OtherPoliciesDTO): Promise<OtherPoliciesDTO> {
    const accessControl = await this.accessControlRepository.findUser(userId);

    if (!accessControl.canEditPolicies()) {
      throw new Error("PERMITION_DENIED");
    }

    let otherPolicies = OtherPolicies.fromDTO(otherPoliciesDTO, userId, propertyId);

    otherPolicies = await this.policiesRepository.saveOtherPolicies(otherPolicies);

    return otherPolicies.toDTO();
  }


  async saveOrUpdatePaymentPolicies(propertyId: number, userId: number, paymentPoliciesDTO: PaymentPoliciesDTO): Promise<PaymentPoliciesDTO> {
    const accessControl = await this.accessControlRepository.findUser(userId);

    if (!accessControl.canEditPolicies()) {
      throw new Error("PERMITION_DENIED");
    }

    let paymentPolicies = PaymentPolicies.fromDTO(paymentPoliciesDTO, userId, propertyId);

    paymentPolicies = await this.policiesRepository.savePaymentPolicies(paymentPolicies);

    return paymentPolicies.toDTO();
  }

  async saveOrUpdateCancellationPolicies(propertyId: number, userId: number, dto: CancellationPoliciesRequestDTO): Promise<CancellationPoliciesResponseDTO> {
    const accessControl = await this.accessControlRepository.findUser(userId);

    if (!accessControl.canEditPolicies()) {
      throw new AppError("El usuario no puede editar las politicas", 404, "PERMITION_DENIED")
    }

    let cancellationPolicies = CancellationPolicies.fromDTO(propertyId, userId, dto);

    cancellationPolicies = await this.policiesRepository.saveCancellationPolicies(cancellationPolicies);

    return cancellationPolicies.toDTO()
  }
}
