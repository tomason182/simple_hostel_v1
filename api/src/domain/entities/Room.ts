import { Bed } from "./Bed";
import { RoomType } from "./RoomTypes";

export class Room {
  private beds: Array<Bed> = [];

  constructor(
    public id: number | null,
    public roomType: RoomType,
    public name: string,
  ) {
    this.id = id;
    this.roomType = roomType;
    this.name = name;
  }

  static make(roomType: RoomType, name: string) {
    return new Room(null, roomType, name)
  }

  public addBeds(maxOccupancy: number) {
    if (!this.id) {
      throw new Error("NULL_ID. Save the room first before adding beds");
    }
    for (let i = 0; i < maxOccupancy; i++) {
      const bed = Bed.make(i + 1, this.id);
      this.beds.push(bed);
    }

  }
}
