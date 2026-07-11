import { PaymentPoliciesDTO } from "../dto/PoliciesDTO";

export class PaymentPolicies {
  constructor(
    public advancePaymentRequired: boolean,
    public depositAmount: number,
    public updatedAt: Date,
    public updatedBy: number,
  ) {
    this.advancePaymentRequired = advancePaymentRequired;
    this.depositAmount = depositAmount;

    if (depositAmount < 0) {
      throw new Error("PaymentPolicies Error: Deposit amount must be a positive number");
    }
  }

  static fromDTO(dto: PaymentPoliciesDTO, userId: number): PaymentPolicies {
    return new PaymentPolicies(dto.advancePaymentRequired, dto.depositAmount, new Date(), userId)
  }

  public toDTO(): PaymentPoliciesDTO {
    return ({
      advancePaymentRequired: this.advancePaymentRequired,
      depositAmount: this.depositAmount
    });
  }

  public update(dto: PaymentPoliciesDTO, userId: number) {
    this.advancePaymentRequired = dto.advancePaymentRequired;
    this.depositAmount = dto.depositAmount;
    this.updatedAt = new Date();
    this.updatedBy = userId;
  }


}
