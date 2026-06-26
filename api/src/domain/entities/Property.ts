import { Address } from "../value-objects/Address";
import { ContactInfo } from "../value-objects/ContactInfo";
import { Policies } from "../value-objects/Policies";
import { Currencies } from "../value-objects/Currencies";

export class Property {
  constructor(
    public id: number | null,
    public propertyName: string,
    public address: Address,
    public contactInfo: ContactInfo,
    public policies: Policies,
    public currencies: Currencies,
    public description: string | null,
    public createdAt: Date,
    public updatedAt: Date
  ) {
    this.id = id;
    this.propertyName = propertyName;
    this.address = address;
    this.contactInfo = contactInfo;
    this.policies = policies;
    this.currencies = currencies;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt
  };
}
