import { PaymentPoliciesDTO } from "../dto/PoliciesDTO";
import { ReservationDTO } from "../dto/ReservationDTO";

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

  public checkAPA(dto: ReservationDTO, totalAmount: number) {
    if (dto.advancePaymentAmount > totalAmount) {
      throw new Error("APA_ERROR: advance payment amount greater than totalAmount");
    }

    if (dto.bookingSource === "BOOK_ENGINE") {
      return 0
    }



    return dto.advancePaymentAmount;
  }
}
