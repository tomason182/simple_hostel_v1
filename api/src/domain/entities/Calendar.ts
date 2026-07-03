import { SelectedRoom } from "../value-objects/SelectedRoom";
import { RatesAndAvailability } from "./RatesAndAvailability";
import { Reservation } from "./Reservation";

export class Calendar {

  private roomTypes = new Map<number, Map<number, CalendarDay>>();

  static build(rates: Array<RatesAndAvailability>, reservations: Array<Reservation>) {
    const calendar = new Calendar();
    // 1. Iterar sobre cada tarifa
    for (const rate of rates) {
      let roomRates = calendar.roomTypes.get(rate.roomTypeId);
      const timestamp = rate.date.getTime();
      const calendarDay = CalendarDay.build(rate, reservations);

      if (!roomRates) {
        roomRates = new Map<number, CalendarDay>();
        roomRates.set(timestamp, calendarDay);

        calendar.roomTypes.set(rate.roomTypeId, roomRates);
        continue;
      }

      if (roomRates.has(timestamp)) {
        throw new Error("DUPLICATED_RATE_CONFIG");
      }

      roomRates.set(timestamp, calendarDay);
    };



    return calendar
  }

  public hasAvailability(roomTypeId: number, qty: number, date: Date) {
    const calendarDayMap = this.roomTypes.get(roomTypeId);
    if (!calendarDayMap) {
      throw new Error("NO_RATES_SET");
    }
    const calendarDay = calendarDayMap.get(date.getTime())
    if (!calendarDay) {
      throw new Error("NO_RATES_SET");
    }

    return calendarDay.hasAvailabilidy(qty);

  }

  public calculateTotal(checkIn: Date, checkOut: Date, selectedRooms: Array<SelectedRoom>) {

    let totalAmount = 0;

    for (let date = checkIn.getTime(); date < checkOut.getTime(); date = this.nextDay(new Date(date))) {
      for (const selectedRoom of selectedRooms) {
        const roomTypeId = selectedRoom.roomTypeId;
        const qty = selectedRoom.quantity

        const calendarDay = this.getCalendarDay(roomTypeId, new Date(date));
        const dayRate = calendarDay.getRate();

        totalAmount += dayRate * qty;
      }
    }

    return totalAmount

  }

  public nextDay(date: Date) {
    return date.setUTCDate(date.getUTCDate() + 1);
  }

  public getAvailability(roomTypeId: number, date: Date) {

    const calendarDay = this.getCalendarDay(roomTypeId, date)

    return calendarDay.getAvailability();
  }

  public getRate(roomTypeId: number, date: Date) {
    const calendarDay = this.getCalendarDay(roomTypeId, date);

    return calendarDay.getRate();
  }


  public getCalendarDay(roomTypeId: number, date: Date): CalendarDay {
    const calendarDayMap = this.roomTypes.get(roomTypeId);
    if (!calendarDayMap) {
      throw new Error("NO_RATES_SET");
    }
    const calendarDay = calendarDayMap.get(date.getTime())
    if (!calendarDay) {
      throw new Error("NO_RATES_SET");
    }

    return calendarDay
  }
}

class CalendarDay {

  constructor(
    private rate: RatesAndAvailability,
    private reservations: Array<Reservation>,
    private reservedQty: number = 0
  ) {
    this.rate = rate;
    this.reservations = reservations;
  }

  static build(rate: RatesAndAvailability, reservations: Array<Reservation>): CalendarDay {
    const date = rate.date;
    const roomTypeId = rate.roomTypeId;
    const calendarDay = new CalendarDay(rate, []);

    for (const reservation of reservations) {
      if (!reservation.isActiveOn(date)) {
        continue;
      }

      if (reservation.getQuantity(roomTypeId) <= 0) {
        continue;
      }

      calendarDay.reservedQty += reservation.getQuantity(roomTypeId);

      calendarDay.reservations.push(reservation);

    }

    return calendarDay;
  };

  getAvailability() {
    return this.rate.roomsToSell - this.reservedQty
  }

  hasAvailabilidy(qty: number) {
    return this.getAvailability() >= qty;
  }

  getRate() {
    return this.rate.customRate;
  }

}

