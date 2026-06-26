export type RoomTypeLiteral = "dorm" | "private";
export type Gender = "male" | "female" | "mixed";
export type Product = Array<{ roomName: string; beds: Array<number> }>;
export type Amenities = Array<number>;

export class RoomType {
  private MAX_BEDS_ALLOWED = 50;

  constructor(
    public id: number | null,
    public propertyId: number,
    public description: string,
    public type: RoomTypeLiteral,
    public gender: Gender,
    public maxOccupancy: number,
    public inventory: number,
    public status: boolean,
    public products: Product,
    public amenities: Amenities,
    public createdAt: Date,
    public updatedAt: Date
  ) {
    this.id = id;
    this.propertyId = propertyId;
    this.description = description;
    this.type = type;
    this.gender = gender;
    this.maxOccupancy = maxOccupancy;
    this.inventory = inventory;
    this.status = status;
    this.products = products;
    this.amenities = amenities;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  };
}
