import { BreakfastInputDTO, BreakfastOutputDTO } from "../dto/BreakfastDTO";

export class Breakfast {
  constructor(
    public propertyId: number,
    public isIncluded: boolean | null,
    public isServed: boolean | null,
    public price: number | null,
    public from: string | null,
    public to: string | null,
    public updatedBy: number | null,
    public updatedAt: Date | null
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

  static make(dto: BreakfastInputDTO, userId: number, propertyId: number) {
    const updatedBy = userId;
    const updatedAt = new Date();
    return new Breakfast(propertyId, dto.isIncluded, dto.isServed, dto.price, dto.from, dto.to, updatedBy, updatedAt)
  }

  public update(breakfastDTO: BreakfastInputDTO, userId: number, propertyId: number) {
    return new Breakfast(
      propertyId,
      breakfastDTO.isIncluded,
      breakfastDTO.isServed,
      breakfastDTO.price,
      breakfastDTO.from,
      breakfastDTO.to,
      userId,
      new Date(),
    )
  }
  public toOutPutDTO(): BreakfastOutputDTO {
    return {
      propertyId: this.propertyId,
      isIncluded: this.isIncluded,
      isServed: this.isServed,
      price: this.price,
      from: this.from,
      to: this.to,
      updatedBy: this.updatedBy,
      updatedAt: this.updatedAt
    }
  }
}
