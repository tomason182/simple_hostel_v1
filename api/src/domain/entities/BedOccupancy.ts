import { addDays } from "../../utils/dateUtils";

export class BedOccupancy {
  constructor(
    private id: number | null,
    private reservationId: number,
    private bedId: number,
    private roomTypeId: number,
    private checkIn: Date,
    private checkOut: Date
  ) {
    this.id = id;
    this.reservationId = reservationId;
    this.bedId = bedId;
    this.roomTypeId = roomTypeId;
    this.checkIn = checkIn;
    this.checkOut = checkOut;

    if (this.checkIn >= this.checkOut) {
      throw new Error("INVALID_DATES_RANGE");
    }
  }

  // Getters

  getBedId(): number {
    return this.bedId;
  }

  getRoomTypeId(): number {
    return this.roomTypeId;
  }

  getOccupiedDates(): Array<Date> {
    const dates: Array<Date> = [];
    let date = new Date(this.checkIn.getTime());

    while (date < this.checkOut) {
      date = addDays(date, 1);

      dates.push(date);
    }

    return dates
  }

  getReservationId(): number {
    return this.reservationId;
  }
}


