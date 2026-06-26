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
}
