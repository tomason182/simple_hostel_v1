import { Room } from "./Room";

export type BedType = "single" | "doble" | "bunk_bed" | "king"

export class Bed {

  constructor(
    private id: number | null,
    public bedNumber: number,
    public bedType: BedType,
  ) {
    this.id = id;
    this.bedNumber = bedNumber;
    this.bedType = bedType;
  }

  static make(bedNum: number) {
    return new Bed(
      null,
      bedNum,
      "single"
    );

  }

  public getId() {
    if (this.id === null) {
      throw new Error("BED_ID_NOT_ADDED");
    }
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }

  public changeBedType(bedType: BedType): void {
    this.bedType = bedType;
  }

}

