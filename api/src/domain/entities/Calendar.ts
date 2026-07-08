import { RatesAndAvailability } from "./RatesAndAvailability";
import { Reservation } from "./Reservation";

export class Calendar {
  // roomTypeId --> timestamp -->  CalendarDay (Rates | bed --> reservation)
  private roomTypes = new Map<number, Map<number, CalendarDay>>();
  private _rates = new Map<number, Map<number, RatesAndAvailability>>();

  private static buildRateIndex(rates: Array<RatesAndAvailability>): Map<number, Map<number, RatesAndAvailability>> {
    const index = new Map<number, Map<number, RatesAndAvailability>>();

    for (const rate of rates) {
      const roomTypeId = rate.roomTypeId;
      const timestamp = rate.date.getTime();

      let ratesTimeline = index.get(roomTypeId);

      if (!ratesTimeline) {
        ratesTimeline = new Map<number, RatesAndAvailability>();
        index.set(roomTypeId, ratesTimeline);
      }

      if (ratesTimeline.has(timestamp)) {
        throw new Error("DUPLICATED_RATE_CONFIG");
      }

      ratesTimeline.set(timestamp, rate);

    }
    return index;
  }

  public getRate(roomTypeId: number, timestamp: number): RatesAndAvailability {
    const timeline = this._rates.get(roomTypeId);

    if (!timeline) {
      throw new Error("ROOM_TYPE_NOT_FOUND");
    }

    const rate = timeline.get(timestamp);

    if (!rate) {
      throw new Error("RATE_NOT_FOUND");
    }

    return rate;
  }


  static build(reservations: Array<Reservation>, rates: Array<RatesAndAvailability>): Calendar {
    const calendar = new Calendar();

    calendar._rates = Calendar.buildRateIndex(rates);

    for (const reservation of reservations) {
      // 1. Obtener los cuartos seleccionados en la reserva --> { roomTypeId, quantity, beds[]}
      const selectedRooms = reservation.getSelectedRooms();
      // 2. Iterar sobre cada cuarto para obtener roomTypeId y camas.
      // Nota: Aqui podria haber un problema si a la reserva no se le asigno camas beds empty array.
      for (const selectedRoom of selectedRooms) {
        const roomTypeId = selectedRoom.getRoomTypeId();
        const beds = selectedRoom.getBeds();
        // 3. Iteramos sobre cada una de las camas que devuelve selectedRoom.
        // NOTA. Estas camas pertenecen a un tipo de cuarto. Si el listado esta vacio no se produce la iteracion.

        let calendarTimeline = calendar.roomTypes.get(roomTypeId);
        if (!calendarTimeline) {
          calendarTimeline = new Map();
          calendar.roomTypes.set(roomTypeId, calendarTimeline);
        }
        for (let date = reservation.checkIn.getTime(); date < reservation.checkOut.getTime(); date = calendar.nextDay(date)) {
          const rate = calendar.getRate(roomTypeId, date);

          let calendarDay = calendarTimeline.get(date);

          if (!calendarDay) {
            calendarDay = new CalendarDay(rate);
            calendarTimeline.set(date, calendarDay);
          }

          for (const bed of beds) {
            const bedId = bed.getId();
            // 4 Buscar en calendar.roomTypes si el roomTypeId ya fue agregado.
            calendarDay.addBed(bedId, reservation)
          }
        }
      }
    }
    return calendar;
  }


  public nextDay(date: number): number {
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    return next.getTime()
  }
}

class CalendarDay {
  private readonly beds = new Map<number, Reservation>

  constructor(
    private readonly rate: RatesAndAvailability,
  ) {
    this.rate = rate;
  }

  public addBed(bedId: number, reservation: Reservation) {
    if (this.beds.has(bedId)) {
      throw new Error("DOUBLE_ASSIGNMENT");
    }
    this.beds.set(bedId, reservation)
  }
}


class BedOccupancy {
  constructor(
    private readonly reservation: Reservation,
    private readonly rate: RatesAndAvailability,
  ) {
    this.reservation = reservation;
    this.rate = rate;
  }

  public getReservationId() {
    return this.reservation.getId();
  }
}
