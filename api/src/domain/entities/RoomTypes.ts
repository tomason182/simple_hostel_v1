import { Room } from "./Room";

export class RoomType {
  private isActive: boolean = true;
  constructor(
    private id: number | null,
    private propertyId: number,
    private description: string,
    private rooms: Array<Room>,
  ) {
    this.id = id;
    this.propertyId = propertyId;
    this.description = description;
    this.rooms = rooms;
  }

  static make(propertyId: number, description: string, inventary: number, maxOccupancy: number) {
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
      rooms

    )
  }

  public deactivate() {
    this.isActive = false;
  }
  public activate() {
    this.isActive = true;
  }

}
