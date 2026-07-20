import { RatesAndAvailabilityDTO, RatesAndAvailabilityOutputDTO } from "../dto/RatesAndAvailabilityDTO";

export class RatesAndAvailability {
  constructor(
    public id: number | null,
    public propertyId: number,
    public roomTypeId: number,
    public date: Date,
    public customRate: number,
    public roomsToSell: number,
    public createdBy: number,
    public createdAt: Date,
    public updatedBy: number,
    public updatedAt: Date
  ) {
    this.id = id;
    this.propertyId = propertyId;
    this.roomTypeId = roomTypeId;
    this.date = date;
    this.customRate = customRate;
    this.roomsToSell = roomsToSell;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;

    if (this.roomsToSell < 0) {
      throw new Error("INVALID_ROOMS_TO_SELL_VALUE");
    }
    if (this.customRate < 0) {
      throw new Error("INVALID_RATE_VALUE")
    }
  }


  static fromDTO(propertyId: number, userId: number, dto: RatesAndAvailabilityDTO): RatesAndAvailability {
    return new RatesAndAvailability(
      null,
      propertyId,
      dto.roomTypeId,
      dto.date,
      dto.customRate,
      dto.roomsToSell,
      userId,
      new Date(),
      userId,
      new Date()
    );
  };

  public toDTO(): RatesAndAvailabilityOutputDTO {
    return {
      propertyId: this.propertyId,
      roomTypeId: this.roomTypeId,
      date: this.date,
      customRate: this.customRate,
      roomsToSell: this.roomsToSell,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy
    }

  }

  public update(propertyId: number, userId: number, dto: RatesAndAvailabilityDTO): void {
    if (this.propertyId !== propertyId) {
      throw new Error("PROPERTY_ID_DONT_MATCH");
    }

    this.customRate = dto.customRate;
    this.roomsToSell = dto.roomsToSell;
    this.updatedBy = userId;
    this.updatedAt = new Date();
  }

}
