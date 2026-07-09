import { Bed } from "./Bed";
import { Reservation } from "./Reservation";

export class BedOccupancy {
  constructor(
    private id: number | null,
    private date: Date,
    private reservationId: number,
    private bedId: number,
    private roomTypeId: number,
  ) {
    this.date = date;
    this.reservationId = reservationId;
    this.bedId = bedId;
    this.roomTypeId = roomTypeId;
  }

  // Getters

  getBedId(): number {
    return this.bedId;
  }

  getRoomTypeId(): number {
    return this.roomTypeId;
  }

  getDate(): Date {
    return this.date;
  }

  getReservationId(): number {
    return this.reservationId;
  }
}


