import { SelectedRoom } from "../value-objects/SelectedRoom";
import { RatesAndAvailability } from "./RatesAndAvailability";
import { Reservation } from "./Reservation";
import { RoomType } from "./RoomTypes";

class Calendar {

  private roomTypes = new Map<number, Map<number, CalendarDay>>();

  static build(rates: Array<RatesAndAvailability>, rooms: Array<RoomType>, reservations: Array<Reservation>, from: Date, to: Date) {
    const calendar = new Calendar();
    // 1. Iterar sobre cada tarifa
    for (const rate of rates) {
      let roomRates = calendar.roomTypes.get(rate.roomTypeId);
      const timestamp = rate.date.getTime();

      if (!roomRates) {
        roomRates = new Map<number, CalendarDay>();
        roomRates.set(timestamp, new CalendarDay(rate, []))

        calendar.roomTypes.set(rate.roomTypeId, roomRates);
        continue;
      }

      if (roomRates.has(timestamp)) {
        throw new Error("DUPLICATED_RATE_CONFIG");
      }

      roomRates.set(timestamp, new CalendarDay(rate, []));
    };

    for (const reservation of reservations) {
      const selectedRooms = reservation.selectedRooms;
      for (const selectedRoom of selectedRooms) {
        const roomId = selectedRoom.roomTypeId;
        const roomCalendar = calendar.roomTypes.get(roomId);

        if (!roomCalendar) {
          throw new Error("MISSING_ROOM_TYPE");
        }

        for (const [timestamp, day] of roomCalendar.entries()) {
          if (reservation.isActiveOn(new Date(timestamp))) {
            day.addReservation(reservation)
          }
        }
      }
    }

    return calendar
  }
}

class CalendarDay {

  constructor(
    private rate: RatesAndAvailability,
    private reservations: Array<Reservation>
  ) {
    this.rate = rate;
    this.reservations = reservations
  }

  addReservation(reservation: Reservation) {
    this.reservations.push(reservation);
  }
}

