import { AppError } from "../../errors/AppError";
import { CancellationPoliciesRequestDTO, CancellationPoliciesResponseDTO } from "../dto/CancellationPoliciesDTO";

export class CancellationPolicies {
  constructor(
    public propertyId: number,
    public dayBeforeArrival: number,
    public amountRefund: number,
    public updatedAt: Date,
    public updatedBy: number
  ) {
    this.propertyId = propertyId;
    this.dayBeforeArrival = dayBeforeArrival;
    this.amountRefund = amountRefund;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
  }

  static fromDTO(propertyId: number, userId: number, dto: CancellationPoliciesRequestDTO) {

    if (dto.daysBeforeArrival < 0) {
      throw new AppError("dayBeforeArrival must be equal or greater than zero", 404, "INVALID_DAYS_BEFORE_ARRIVAL_INPUT")
    }

    if (dto.amountRefund < 0 || dto.amountRefund > 1) {
      throw new AppError("amount refound must be between 0 and 1", 404, "INVALID_AMOUNT_REFOUND_INPUT")

    }

    return new CancellationPolicies(
      propertyId, dto.daysBeforeArrival, dto.amountRefund, new Date(), userId
    )

  }

  public toDTO(): CancellationPoliciesResponseDTO {
    return {
      propertyId: this.propertyId,
      daysBeforeArrival: this.dayBeforeArrival,
      amountRefund: this.amountRefund,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy
    }
  }


}
