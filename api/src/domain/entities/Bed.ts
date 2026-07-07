import { Room } from "./Room";

export type BedType = "SINGLE" | "DOUBLE" | "BUNK_BED" | "KING"

export class Bed {

  constructor(
    private id: number | null,
    private bedNumber: number,
    private bedType: BedType,
  ) {
    this.id = id;
    this.bedNumber = bedNumber;
    this.bedType = bedType;
  }

  static make(bedNum: number) {
    return new Bed(
      null,
      bedNum,
      "SINGLE"
    );

  }

  public getId() {
    if (this.id === null) {
      throw new Error("BED_ID_NOT_ADDED");
    }
    return this.id;
  }

  public changeBedType(bedType: BedType): void {
    this.bedType = bedType;
  }
}

