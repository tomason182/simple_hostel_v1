import { Bed } from "./Bed";
import { Reservation } from "./Reservation";

export class BedOccupancy {
  constructor(
    private id: number | null,
    private date: Date,
    private reservationId: number,
    private bedId: number
  ) {
    this.date = date;
    this.reservationId = reservationId;
    this.bedId = bedId;
  }

  // Getters

  getBeds(): number {
    return this.bedId;
  }

  getDate(): Date {
    return this.date;
  }

  getReservation(): number {
    return this.reservationId;
  }
}


