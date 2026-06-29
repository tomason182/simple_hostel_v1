import { GeneralPoliciesDTO } from "../dto/PoliciesDTO";

export class GeneralPolicies {
  constructor(
    public minLengthStay: number,
    public maxLengthStay: number,
    public minAdvanceBooking: number,
    public breakfastIncluded: boolean,
    public checkInFrom: string | null,
    public checkOutFrom: string | null,
    public checkInUntil: string | null,
    public checkOutUntil: string | null,

  ) {
    this.minLengthStay = minLengthStay;
    this.maxLengthStay = maxLengthStay;
    this.minAdvanceBooking = minAdvanceBooking;
    this.breakfastIncluded = breakfastIncluded;
    this.checkInFrom = checkInFrom;
    this.checkOutFrom = checkOutFrom;
    this.checkInUntil = checkInUntil;
    this.checkOutUntil = checkOutUntil;

    if (minLengthStay < 0 || maxLengthStay < 0 || minAdvanceBooking < 0) {
      throw new Error("GeneralPolicies Error: Values must be non-negative numbers");
    }
  }

  static fromDTO(dto: GeneralPoliciesDTO): GeneralPolicies {
    return new GeneralPolicies(
      dto.minLengthStay,
      dto.maxLengthStay,
      dto.minAdvanceBooking,
      dto.breakfastIncluded,
      dto.checkInFrom,
      dto.checkOutFrom,
      dto.checkInUntil,
      dto.checkOutUntil
    )
  }
}
