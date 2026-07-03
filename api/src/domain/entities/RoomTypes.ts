import { RoomTypeDTO } from "../dto/RoomTypeDTO";
import { Room } from "./Room";

export type RoomTypeLiteral = "dorm" | "private";
export type Gender = "male" | "female" | "mixed";
export type Amenities = Array<number>;

export class RoomType {
  private MAX_BEDS_ALLOWED = 50;  // Esta variable no debe pertenecer a RoomType.
  private rooms: Array<Room> = [];
  private amenities: Amenities = [];
  private isActive: boolean = true;

  constructor(
    public id: number | null,
    public propertyId: number,
    public description: string,
    public type: RoomTypeLiteral,
    public gender: Gender,
    public maxOccupancy: number,
    public inventory: number,
    public createdAt: Date,
    public updatedAt: Date,
    public createdBy: number,
    public updatedBy: number,
  ) {
    this.id = id;
    this.propertyId = propertyId;
    this.description = description;
    this.type = type;
    this.gender = gender;
    this.maxOccupancy = maxOccupancy;
    this.inventory = inventory;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  };

  static make(dto: RoomTypeDTO, userId: number) {
    const roomType = new RoomType(null, dto.propertyId, dto.description, dto.type, dto.gender, dto.maxOccupancy, dto.inventory, new Date(), new Date(), userId, userId)

    roomType.addRooms(roomType, dto.inventory)
  }

  private addRooms(roomType: RoomType, inventory: number) {
    for (let i = 0; i < inventory; i++) {
      const name = `Room ${i + 1}`;
      const room = Room.make(roomType, name)
      this.rooms.push(room)
    }
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

    const filteredArray = array.filter(room => room.id !== this.id);
    let storedBeds = 0;
    for (const room of filteredArray) {
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

  public hasCapacityDecrease(oldRoomType: RoomType): boolean {

    if (this.maxOccupancy * this.inventory < oldRoomType.maxOccupancy * oldRoomType.inventory) {
      return true;
    }
    return false;
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

