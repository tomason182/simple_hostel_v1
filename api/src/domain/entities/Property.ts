import { Address } from "../value-objects/Address";
import { ContactInfo } from "../value-objects/ContactInfo";
import { Policies } from "../value-objects/Policies";
import { Currencies } from "../value-objects/Currencies";

export type PropertyStatus = "ACTIVE" | "SUSPENDED" | "PENDING";
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
    this.profileStatus = profileStatus;
  };

  // Metodos de class
  static createNewProperty(propertyName: string): Property {
    const propertyStatus = "PENDING";
    const profileStatus = "INCOMPLETE";
    const createdAt = new Date();
    const updatedAt = new Date();

    return new Property(null, propertyName, null, null, null, null, null, createdAt, updatedAt, propertyStatus, profileStatus);
  }

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

  public checkPropertyProfileStatus() {

  }


  // Getters y Setters.
  getId(): number {
    const id = this.id;
    if (!id) {
      throw new Error("PropertyId is not set");
    }
    return id
  }

  setId(id: number) {
    if (id <= 0) {
      throw new Error("INVALID_ID_VALUE");
    }
    this.id = id;
  }

}
