import { Address } from "../value-objects/Address";
import { ContactInfo } from "../value-objects/ContactInfo";
import { Policies } from "../value-objects/Policies";
import { Currencies } from "../value-objects/Currencies";

export type PropertyStatus = "ACTIVE" | "SUSPENDED" | "ACTIVE";
export type ProfileStatus = "COMPLETE" | "INCOMPLETE";

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
    public profileStatus: ProfileStatus,
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

  // Metodos de instancia.
  public isPropertyActive() {
    if (this.status === "ACTIVE") {
      return true;
    };

    return false
  }

}
