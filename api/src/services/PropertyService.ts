import { IPropertyService } from "../domain/interfaces/IPropertyService";
import { IPoliciesRepository } from "../domain/ports/IPoliciesRepository";
import { IAccessControlRepository } from "../domain/ports/IAccessControlRepository";
import { GeneralPolicies } from "../domain/value-objects/GeneralPolicies";
import { UserRole } from "../domain/entities/AccessControl";
import { GeneralPoliciesDTO, MinorPoliciesDTO, OtherPoliciesDTO, PaymentPoliciesDTO, PoliciesDTO } from "../domain/dto/PoliciesDTO";
import { ContactInfoDTO } from "../domain/dto/ContactInfoDTO";
import { IPropertyRepository } from "../domain/ports/IPropertyRepository";
import { ContactInfo } from "../domain/value-objects/ContactInfo";
import { AddressDTO } from "../domain/dto/AddressDTO";
import { Address } from "../domain/value-objects/Address";
import { PaymentPolicies } from "../domain/value-objects/PaymentPolicies";
import { MinorPolicies } from "../domain/value-objects/MinorPolicies";
import { OtherPolicies } from "../domain/value-objects/OtherPolicies";

export class PropertyService implements IPropertyService {
  propertyRepository: IPropertyRepository;
  accessControlRepository: IAccessControlRepository;

  constructor(propertyRepository: IPropertyRepository, accessControlRepository: IAccessControlRepository) {
    this.propertyRepository = propertyRepository;
    this.accessControlRepository = accessControlRepository;
  }

  // =========================================================
  // ContactInfo
  // =========================================================
  async getContactInfo(propertyId: number): Promise<ContactInfoDTO> {
    const contactInfo = await this.propertyRepository.getContactInfo(propertyId);

    if (!contactInfo) {
      throw new Error("CONTACT_INFO_NOT_FOUND");
    };

    return contactInfo.toDTO();
  }

  async saveAndUpdateContactInfo(propertyId: number, userId: number, contactInfoDTO: ContactInfoDTO): Promise<ContactInfoDTO> {
    let contactInfo = await this.propertyRepository.getContactInfo(propertyId);

    if (!contactInfo) {
      contactInfo = ContactInfo.make(contactInfoDTO, userId);
    } else {
      contactInfo.update(contactInfoDTO, userId);
    }

    await this.propertyRepository.saveContactInfo(propertyId, contactInfo);

    return contactInfoDTO
  }
  // =======================================================
  // ADDRESS
  // =======================================================
  async getAddress(propertyId: number): Promise<AddressDTO> {
    let address = await this.propertyRepository.getAddress(propertyId);

    if (!address) {
      throw new Error("ADDRESS_NOT_FOUND");
    };

    return address.toDTO();
  }

  async saveAndUpdateAddress(propertyId: number, addressDTO: AddressDTO, userId: number): Promise<AddressDTO> {
    let address = await this.propertyRepository.getAddress(propertyId);

    if (!address) {
      address = Address.make(addressDTO, userId);
    } else {
      address.update(addressDTO, userId);
    }

    await this.propertyRepository.saveAddress(propertyId, address);

    return address.toDTO()
  }

  // =============================================
  // POLICIES
  // =============================================
  async getPolicies(propertyId: number): Promise<PoliciesDTO> {
    const policies = await this.propertyRepository.getPolicies(propertyId);

    if (!policies) {
      throw new Error("POLICIES_NOT_FOUND");
    }
    return policies.toDTO()
  }

  async saveAndUpdateGeneralPolicies(propertyId: number, userId: number, generalDTO: GeneralPoliciesDTO): Promise<GeneralPoliciesDTO> {
    let general = await this.propertyRepository.getGeneralPolicies(propertyId);

    if (!general) {
      general = GeneralPolicies.fromDTO(generalDTO, userId);
    } else {
      general.update(generalDTO, userId)
    }

    await this.propertyRepository.saveGeneralPolicies(propertyId, general);

    return generalDTO;
  }

  async saveAndUpdatePaymentPolicies(propertyId: number, userId: number, paymentPoliciesDTO: PaymentPoliciesDTO): Promise<PaymentPoliciesDTO> {
    let paymentPolicies = await this.propertyRepository.getPaymentPolicies(propertyId);

    if (!paymentPolicies) {
      paymentPolicies = PaymentPolicies.fromDTO(paymentPolicies, userId)
    } else {
      paymentPolicies.update(paymentPoliciesDTO, userId);
    }

    await this.propertyRepository.savePayementPolicies(propertyId, paymentPolicies);

    return paymentPolicies.toDTO();
  }

  async saveAndUpdateMinorPolicies(propertyId: number, userId: number, minorPoliciesDTO: MinorPoliciesDTO): Promise<MinorPoliciesDTO> {
    let minorPolicies = await this.propertyRepository.getMinorPolicies(propertyId);

    if (!minorPolicies) {
      minorPolicies = MinorPolicies.fromDTO(minorPoliciesDTO, userId);
    } else {
      minorPolicies.update(minorPoliciesDTO, userId);
    }

    await this.propertyRepository.saveMinorPolicies(propertyId, minorPolicies);

    return minorPolicies.toDTO();
  }

  async saveAndUpdateOtherPolicies(propertyId: number, userId: number, otherPoliciesDTO: OtherPoliciesDTO): Promise<OtherPoliciesDTO> {
    let otherPolicies = await this.propertyRepository.getOtherPolicies(propertyId);
    if (!otherPolicies) {
      otherPolicies = OtherPolicies.fromDTO(otherPoliciesDTO, userId);
    } else {
      otherPolicies.update(otherPoliciesDTO, userId)
    }

    await this.propertyRepository.saveOtherPolicies(propertyId, otherPolicies);

    return otherPolicies.toDTO();
  }
}
