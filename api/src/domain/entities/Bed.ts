import { Room } from "./Room";

export type BedType = "SINGLE" | "DOUBLE" | "BUNK_BED" | "KING"

export class Bed {
  constructor(
    private id: number | null,
    private bedNumber: number,
    private room: Room,
    public bedType: BedType | null,
  ) {
    this.id = id;
    this.bedNumber = bedNumber;
    this.room = room;
    this.bedType = bedType;
  }


  static make(bedNumber: number, room: Room) {
    return new Bed(null, bedNumber, room, null)
  }
}
