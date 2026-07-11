import { BreakfastDTO } from "../dto/BreakfastDTO";

export class Breakfast {
  constructor(
    private propertyId: number,
    private isIncluded: boolean | null,
    private isServed: boolean | null,
    private price: number | null,
    private from: string | null,
    private to: string | null,
    private updatedBy: number,
    private updatedAt: Date
  ) {
    this.propertyId = propertyId;
    this.isIncluded = isIncluded;
    this.isServed = isServed;
    this.price = price;
    this.from = from;
    this.to = to;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;

  }

  static make(dto: BreakfastDTO, userId: number) {
    const updatedBy = userId;
    const updatedAt = new Date();
    return new Breakfast(dto.propertyId, dto.isIncluded, dto.isServed, dto.price, dto.from, dto.to, updatedBy, updatedAt)
  }

  public update(breakfastDTO: BreakfastDTO, userId: number) {
    return new Breakfast(
      breakfastDTO.propertyId,
      breakfastDTO.isIncluded,
      breakfastDTO.isServed,
      breakfastDTO.price,
      breakfastDTO.from,
      breakfastDTO.to,
      userId,
      new Date(),
    )

  }
}
