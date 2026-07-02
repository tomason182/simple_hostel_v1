import { RatesAndAvailability } from "./RatesAndAvailability";
import { Reservation } from "./Reservation";
import { RoomType } from "./RoomTypes";

export class Calendar {
  constructor(
    public readonly rates: RatesAndAvailability,
    public readonly reservations: Array<Reservation>,


  ) { }

  static mapper(roomTypes: Array<RoomType>, rates: Array<RatesAndAvailability>, reservations: Array<Reservation>) {

  }
}
