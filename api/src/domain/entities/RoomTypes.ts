import { RoomTypeDTO } from "../dto/RoomTypeDTO";

export type RoomTypeLiteral = "dorm" | "private";
export type Gender = "male" | "female" | "mixed";
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
    public products: Array<Product>,
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


  static fromDTO(dto: RoomTypeDTO): RoomType {

    const products = this.makeProduct(dto)
    const status = true                     // se marca activado.
    const amenities: Amenities = [];

    return new RoomType(
      null, dto.propertyId, dto.description, dto.type, dto.gender, dto.maxOccupancy, dto.inventory, status, products, amenities, new Date(), new Date())


  }

  private static makeProduct(dto: RoomTypeDTO): Array<Product> {

    const product = [];
    for (let i = 0; i < dto.inventory; i++) {
      const roomName = `Room ${i + 1}`;
      const bedsArray = new Array(dto.maxOccupancy).fill(null);
      const beds = bedsArray.map((bed, i) => bed = i + 1)

      product.push(new Product(roomName, beds));
    };

    return product
  }


  public checkSameDescription(array: Array<RoomType>) {

    const descriptionExists = array.some(room =>
      room.id !== this.id &&
      room.description === this.description);

    if (descriptionExists) {
      throw new Error("ROOMTYPE_EXISTS");
    }
    return
  }


  public checkBedsLimit(array: Array<RoomType>): void {
    const newBeds = this.type === "private" ? this.inventory : this.inventory * this.maxOccupancy;

    let storedBeds = 0;
    for (const room of array) {
      if (room.type === "private") {
        storedBeds += room.inventory;
      } else {
        storedBeds += room.inventory * room.maxOccupancy;
      }
    }

    if (newBeds + storedBeds > this.MAX_BEDS_ALLOWED) {
      throw new Error("MAX_BEDS_LIMIT_REACHED")
    }

    return

  }

  // Getters y Setters
  public getId(): number {
    if (this.id === null) {
      throw new Error("NULL_ID");
    }

    return this.id;
  }

  public getbeds(): number {
    if (this.type === "private") {
      return this.inventory;
    }
    return this.inventory * this.maxOccupancy;
  }


}

export class Product {
  constructor(
    public roomName: string,
    public beds: Array<number>
  ) {
    this.roomName = roomName;
    this.beds = beds;
  }

}
