import { ContactInfoDTO } from "../dto/ContactInfoDTO";
import { PoliciesDTO } from "../dto/PoliciesDTO";
import { UserRole } from "../entities/AccessControl";


export interface IPropertyService {
  getFacilities(propertyId: number): Promise<Array<number>>;
  updateFacilities(facilities: Array<number>): Promise<{ msg: string }>;

  getPolicies(propertyId: number): Promise<PoliciesDTO>;
  updatePolicies(propertyId: number, userId: number, userRole: UserRole, policies: PoliciesDTO): Promise<{ msg: string }>;

  getContactInfo(propertyId: number): Promise<ContactInfoDTO>;
  updateContactInfo(propertyId: number, userId: number, userRole: UserRole, contactInfo: ContactInfoDTO): Promise<{ msg: string }>
}
