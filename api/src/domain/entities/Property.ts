import { Address } from "../value-objects/Address";
import { ContactInfo } from "../value-objects/ContactInfo";
import { Policies } from "../value-objects/Policies";
import { Currencies } from "../value-objects/Currencies";
import { CreatePropertyDTO, PropertyDTO } from "../dto/PropertyDTO";

export type PropertyStatus = "PENDING_PROFILE" | "PENDING_EMAIL" | "ACTIVE" | "SUSPENDED" | "ACTIVE";

export class Property {
  constructor(
    public id: number | null,
    public propertyName: string,
    public address: Address | null,
    public contactInfo: ContactInfo | null,
    public policies: Policies | null,
    public currencies: Currencies | null,
    public description: string | null,
    public createdAt: Date,
    public updatedAt: Date,
    public status: PropertyStatus,
  ) {
    this.id = id;
    this.propertyName = propertyName;
    this.address = address;
    this.contactInfo = contactInfo;
    this.policies = policies;
    this.currencies = currencies;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
  };

  static updateDate() {
    return new Date();
  }

  static fromDTO(dto: PropertyDTO): Property {
    return new Property(
      dto.id,
      dto.propertyName,
      dto.address,
      dto.contactInfo,
      dto.policies,
      dto.currencies,
      dto.description,
      dto.createdAt,
      dto.updatedAt,
    )
  }

  static fromCreatePropertyDTO(dto: CreatePropertyDTO): Property {
    const address = Address.default();
    const contactInfo = ContactInfo.default();
    const policies = Policies.default();
    const currencies = Currencies.default();
    const status = "pending"
    return new Property(
      null,
      dto.propertyName,
      address,
      contactInfo,
      policies,
      currencies,
      null,
      new Date(),
      Property.updateDate(),
      status
    )
  }

}
