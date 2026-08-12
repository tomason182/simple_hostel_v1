import { Room } from "./Room";
import { Bed } from "./Bed";
import { RoomTypeResponseDTO, RoomTypeRequestDTO } from "../dto/RoomTypeDTO";
import { AppError } from "../../errors/AppError";

export type RoomTypeLiteral = "DORM" | "PRIVATE";
export type Gender = "mixed" | "male" | "female";

export class RoomType {
  private isActive: boolean = true;
  constructor(
    private id: number | null,
    public propertyId: number,
    public description: string,
    public type: RoomTypeLiteral,
    public gender: Gender,
    public rooms: Array<Room>,
    public createdAt: Date,
    public createdBy: number,
    public updatedAt: Date,
    public updatedBy: number

  ) {
    this.id = id;
    this.propertyId = propertyId;
    this.description = description;
    this.type = type;
    this.gender = gender;
    this.rooms = rooms;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
  }

  public toDTO(): RoomTypeResponseDTO {
    if (this.id === null) {
      throw new Error("INVALID_ROOM_TYPE");
    }

    return {
      id: this.id,
      propertyId: this.propertyId,
      description: this.description,
      gender: this.gender,
      type: this.type,
      inventory: this.calcInventory(),
      maxOccupancy: this.calcMaxOccupancy(),
      createdAt: this.createdAt,
      createdBy: this.createdBy,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy

    }
  }

  private calcInventory(): number {
    return this.rooms.length
  }

  private calcMaxOccupancy(): number {
    let occ = 0;
    for (const room of this.rooms) {
      occ += room.getOccupancy();
    }

    return occ;
  }

  static make(propertyId: number, description: string, type: RoomTypeLiteral, gender: Gender, inventary: number, maxOccupancy: number, userId: number) {
    if (inventary <= 0) {
      throw new Error("INVALID_INVENTARY_VALUE");
    }
    if (maxOccupancy <= 0) {
      throw new Error("INVALID_OCCUPANCY_VALUE")
    }

    if (description.trim().length === 0) {
      throw new Error("INVALID_DESCRIPTION");
    }

    const rooms: Array<Room> = [];
    for (let i = 0; i < inventary; i++) {
      const name = `Room ${i + 1}`;
      rooms.push(Room.make(name, maxOccupancy));
    }
    return new RoomType(
      null,
      propertyId,
      description,
      type,
      gender,
      rooms,
      new Date(),
      userId,
      new Date(),
      userId
    )
  }

  public deactivate() {
    this.isActive = false;
  }
  public activate() {
    this.isActive = true;
  }

  public getId(): number {
    if (!this.id) {
      throw new Error("NO_ROOM_TYPE_ID");
    }
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getRooms(): ReadonlyArray<Room> {
    return [...this.rooms];
  }

  public setRoom(room: Room): void {
    this.rooms.push(room);
  }

  public getBeds(): ReadonlyArray<Bed> {
    return this.rooms.flatMap(room => room.getBeds());

  }

  public getDescription(): string {
    return this.description;
  }

  public checkRoomsToSell(roomsToSell: number, reservationCount: number): boolean {
    if (!this.isActive) {
      throw new AppError("ROOM_TYPE_IS_INACTIVE", 400, "ROOM_TYPE_IS_INACTIVE");
    }

    if (roomsToSell > this.calcMaxOccupancy() && roomsToSell < reservationCount) {
      throw new AppError("INVALID_ROOMS_TO_SELL_VALUE", 400, "INVALID_ROOMS_TO_SELL_VALUE")
    };

    return true;
  }

}
