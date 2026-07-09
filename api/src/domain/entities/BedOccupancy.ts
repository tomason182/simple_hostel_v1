import { Bed } from "./Bed";
import { Reservation } from "./Reservation";

export class BedOccupancy {
  constructor(
    private id: number | null,
    private date: Date,
    private resevationId: number,
    private bedId: number
  ) {
    this.date = date;
    this.resevationId = resevationId;
    this.bedId = bedId;
  }
}
