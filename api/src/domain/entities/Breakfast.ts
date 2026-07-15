import { BreakfastDTO } from "../dto/BreakfastDTO";

export class Breakfast {
  constructor(
    public propertyId: number,
    public isIncluded: boolean | null,
    public isServed: boolean | null,
    public price: number | null,
    public from: string | null,
    public to: string | null,
    public updatedBy: number,
    public updatedAt: Date
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
