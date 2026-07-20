import { PaymentPoliciesDTO, PaymentPoliciesOutputDTO } from "../dto/PoliciesDTO";

export class PaymentPolicies {
  constructor(
    public propertyId: number,
    public advancePaymentRequired: boolean | null,
    public depositAmount: number | null,
    public updatedAt: Date | null,
    public updatedBy: number | null,
  ) {
    this.advancePaymentRequired = advancePaymentRequired;
    this.depositAmount = depositAmount;

    if (depositAmount !== null && depositAmount < 0) {
      throw new Error("PaymentPolicies Error: Deposit amount must be a positive number");
    }
  }

  static fromDTO(dto: PaymentPoliciesDTO, userId: number, propertyId: number): PaymentPolicies {
    return new PaymentPolicies(propertyId, dto.advancePaymentRequired, dto.depositAmount, new Date(), userId)
  }

  public toDTO(): PaymentPoliciesOutputDTO {
    return ({
      propertyId: this.propertyId,
      advancePaymentRequired: this.advancePaymentRequired,
      depositAmount: this.depositAmount,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy
    });
  }

  public update(dto: PaymentPoliciesDTO, userId: number) {
    this.advancePaymentRequired = dto.advancePaymentRequired;
    this.depositAmount = dto.depositAmount;
    this.updatedAt = new Date();
    this.updatedBy = userId;
  }

}
