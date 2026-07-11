import { PoliciesDTO } from "../dto/PoliciesDTO";
import { GeneralPolicies } from "./GeneralPolicies";
import { MinorPolicies } from "./MinorPolicies";
import { OtherPolicies } from "./OtherPolicies";
import { PaymentPolicies } from "./PaymentPolicies";

export class Policies {
  constructor(
    public general: GeneralPolicies,
    public payment: PaymentPolicies,
    public minor: MinorPolicies,
    public other: OtherPolicies,
  ) {
    this.general = general;
    this.payment = payment;
    this.minor = minor;
    this.other = other;
  };

  public toDTO(): PoliciesDTO {
    return {
      general: this.general.toDTO(),
      payment: this.payment.toDTO(),
      minor: this.minor.toDTO(),
      other: this.other.toDTO()
    }
  }

}
