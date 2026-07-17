import { GeneralPoliciesDTO } from "../dto/PoliciesDTO";

export class GeneralPolicies {
  constructor(
    public propertyId: number,
    public minLengthStay: number | null,
    public maxLengthStay: number | null,
    public minAdvanceBooking: number | null,
    public checkInFrom: string | null,
    public checkOutFrom: string | null,
    public checkInUntil: string | null,
    public checkOutUntil: string | null,
    public updatedAt: Date | null,
    public updatedBy: number | null,

  ) {
    this.propertyId = propertyId;
    this.minLengthStay = minLengthStay;
    this.maxLengthStay = maxLengthStay;
    this.minAdvanceBooking = minAdvanceBooking;
    this.checkInFrom = checkInFrom;
    this.checkOutFrom = checkOutFrom;
    this.checkInUntil = checkInUntil;
    this.checkOutUntil = checkOutUntil;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;


    if (minLengthStay !== null && minLengthStay < 0 || maxLengthStay !== null && maxLengthStay < 0 || minAdvanceBooking !== null && minAdvanceBooking < 0 && minAdvanceBooking !== null) {
      throw new Error("GeneralPolicies Error: Values must be non-negative numbers");
    }
  }

  static fromDTO(dto: GeneralPoliciesDTO, userId: number): GeneralPolicies {
    return new GeneralPolicies(
      dto.propertyId,
      dto.minLengthStay,
      dto.maxLengthStay,
      dto.minAdvanceBooking,
      dto.checkInFrom,
      dto.checkOutFrom,
      dto.checkInUntil,
      dto.checkOutUntil,
      new Date(),
      userId
    )
  }
  public toDTO(): GeneralPoliciesDTO {
    return (
      {
        propertyId: this.propertyId,
        minLengthStay: this.minLengthStay,
        maxLengthStay: this.maxLengthStay,
        minAdvanceBooking: this.minAdvanceBooking,
        checkInFrom: this.checkInFrom,
        checkOutFrom: this.checkOutFrom,
        checkInUntil: this.checkInUntil,
        checkOutUntil: this.checkOutUntil
      }
    )
  };

  public update(dto: GeneralPoliciesDTO, userId: number) {
    this.minLengthStay = dto.minLengthStay;
    this.maxLengthStay = dto.maxLengthStay;
    this.minAdvanceBooking = dto.minAdvanceBooking;
    this.checkInFrom = dto.checkInFrom;
    this.checkOutFrom = dto.checkOutFrom;
    this.checkInUntil = dto.checkInUntil;
    this.checkOutUntil = dto.checkOutUntil;
    this.updatedAt = new Date();
    this.updatedBy = userId;
  }

  // ===================================
  // Getters and Getters
  // ===================================

}
