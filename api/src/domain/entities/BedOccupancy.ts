import { Bed } from "./Bed";
import { Reservation } from "./Reservation";

export class BedOccupancy {
  constructor(
    private id: number | null,
    private propertyId: number,
    private reservationId: number,
    private bedId: number,
    private roomTypeId: number,
    private date: Date,
  ) {
    this.id = id;
    this.propertyId = propertyId;
    this.reservationId = reservationId;
    this.bedId = bedId;
    this.roomTypeId = roomTypeId;
    this.date = date;
  }

  // Getters
  getPropertyId(): number {
    return this.propertyId;
  }

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


