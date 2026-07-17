import { IPropertyService } from "../domain/interfaces/IPropertyService";
import { IAccessControlRepository } from "../domain/ports/IAccessControlRepository";
import { ContactInfoDTO } from "../domain/dto/ContactInfoDTO";
import { IPropertyRepository } from "../domain/ports/IPropertyRepository";
import { ContactInfo } from "../domain/value-objects/ContactInfo";
import { AddressDTO } from "../domain/dto/AddressDTO";
import { Address } from "../domain/value-objects/Address";

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

  async saveAndUpdateAddress(propertyId: number, userId: number, addressDTO: AddressDTO): Promise<AddressDTO> {
    let address = await this.propertyRepository.getAddress(propertyId);

    if (!address) {
      address = Address.make(addressDTO, userId);
    } else {
      address.update(addressDTO, userId);
    }

    await this.propertyRepository.saveAddress(propertyId, address);

    return address.toDTO()
  }

}
