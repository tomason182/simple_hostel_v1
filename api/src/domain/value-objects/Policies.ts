import { PoliciesDTO } from "../dto/PoliciesDTO";
import { GeneralPolicies } from "./GeneralPolicies";
import { MinorPolicies } from "./MinorPolicies";
import { OtherPolicies } from "./OtherPolicies";
import { PaymentPolicies } from "./PaymentPolicies";

export class Policies {
  constructor(
    public propertyId: number,
    public general: GeneralPolicies | null,
    public payment: PaymentPolicies | null,
    public minor: MinorPolicies | null,
    public other: OtherPolicies | null,
  ) {
    this.general = general;
    this.payment = payment;
    this.minor = minor;
    this.other = other;
  };

  public toDTO(): PoliciesDTO {
    return {
      propertyId: this.propertyId,
      general: this.general ? this.general.toDTO() : null,
      payment: this.payment ? this.payment.toDTO() : null,
      minor: this.minor ? this.minor.toDTO() : null,
      other: this.other ? this.other.toDTO() : null
    }
  }

}
