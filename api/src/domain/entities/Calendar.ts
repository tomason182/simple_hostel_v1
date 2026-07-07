import { RatesAndAvailability } from "./RatesAndAvailability";
import { Reservation } from "./Reservation";

export class Calendar {
  // roomTypeId --> BedId --> timestamp --> rate | reservation
  private roomTypes = new Map<number, BedTimeline>();
  private rates = new Map<number, Map<number, RatesAndAvailability>>();

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
    const timeline = this.rates.get(roomTypeId);

    if (!timeline) {
      throw new Error("ROOM_TYPE_NOT_FOUND");
    }

    const rate = timeline.get(timestamp);

    if (!rate) {
      throw new Error("RATE_NOT_FOUND");
    }

    return rate;
  }

  public nextDay(date: number): number {
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    return next.getTime()
  }

  static build(reservations: Array<Reservation>, rates: Array<RatesAndAvailability>): Calendar {
    const calendar = new Calendar();

    calendar.rates = Calendar.buildRateIndex(rates);

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
        for (const bed of beds) {
          const bedId = bed.getId();
          // 4 Buscar en calendar.roomTypes si el roomTypeId ya fue agregado.
          let bedTimeline = calendar.roomTypes.get(roomTypeId);

          if (!bedTimeline) {
            // 5. Si no fue agregado, se crea un bedTimeline nuevo y se lo agrega junto con roomTypeId a roomTypes.
            bedTimeline = new BedTimeline();
            calendar.roomTypes.set(roomTypeId, bedTimeline)

          }
          // 6. Para cada dia de estadia de la reserva se optiene el cuadro tarifario "rate".
          for (let date = reservation.checkIn.getTime(); date < reservation.checkOut.getTime(); date = calendar.nextDay(date)) {
            const rate = calendar.getRate(roomTypeId, date);
            bedTimeline.add(reservation, rate, bedId, new Date(date));
          }
        }
      }
    }
    return calendar;
  }
}

class BedTimeline {
  // bedId --> timestamps --> BedOccupancy
  private beds = new Map<number, DayTimeline>();


  public add(reservation: Reservation, rate: RatesAndAvailability, bedId: number, date: Date) {
    const timestamp = date.getTime();

    let dayTimeline = this.beds.get(bedId);

    if (!dayTimeline) {
      dayTimeline = new DayTimeline();
      this.beds.set(bedId, dayTimeline)
    }

    if (dayTimeline.has(timestamp)) {
      throw new Error("DOUBLE_ASSIGNMENT");
    }

    dayTimeline?.add(reservation, rate, timestamp);

  }
}

class DayTimeline {
  private day = new Map<number, BedOccupancy>;

  public add(reservation: Reservation, rate: RatesAndAvailability, timestamp: number) {

    const bedOccupancy = new BedOccupancy(reservation, rate);
    this.day.set(timestamp, bedOccupancy);

  }

  public has(timestamp: number) {
    return this.day.has(timestamp);
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
