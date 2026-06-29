import { PaymentPoliciesDTO } from "../dto/PoliciesDTO";

export class PaymentPolicies {
  constructor(
    public advancePaymentRequired: boolean,
    public depositAmount: number,
  ) {
    this.advancePaymentRequired = advancePaymentRequired;
    this.depositAmount = depositAmount;

    if (depositAmount < 0) {
      throw new Error("PaymentPolicies Error: Deposit amount must be a positive number");
    }
  }

  static fromDTO(dto: PaymentPoliciesDTO): PaymentPolicies {
    return new PaymentPolicies(dto.advancePaymentRequired, dto.depositAmount)
  }
}
