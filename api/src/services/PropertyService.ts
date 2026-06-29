import { IPropertyService } from "../domain/interfaces/IPropertyService";
import { IPoliciesRepository } from "../domain/ports/IPoliciesRepository";
import { IAccessControlRepository } from "../domain/ports/IAccessControlRepository";
import { GeneralPolicies } from "../domain/value-objects/GeneralPolicies";
import { UserRole } from "../domain/entities/AccessControl";
import { GeneralPoliciesDTO, MinorPoliciesDTO, OtherPoliciesDTO, PaymentPoliciesDTO } from "../domain/dto/PoliciesDTO";

export class PropertyService implements IPropertyService {
  propertyRepository: IPropertyRepository;
  accessControlRepository: IAccessControlRepository;

  constructor(propertyRepository: IPropertyRepository, accessControlRepository: IAccessControlRepository) {
    this.propertyRepository = propertyRepository;
    this.accessControlRepository = accessControlRepository;
  }


}
