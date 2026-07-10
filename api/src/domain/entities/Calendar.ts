import { RatesAndAvailability } from "./RatesAndAvailability";
import { BedOccupancy } from "./BedOccupancy";
import { RoomType } from "./RoomTypes";
import { SelectedRoom } from "../value-objects/SelectedRoom";

export class Calendar {
  // roomTypeId --> timestamp -->  CalendarDay
  private roomTypes = new Map<number, Map<number, CalendarDay>>();
  // roomTypeId --> timestamp --> rates

  static build(rates: Array<RatesAndAvailability>, bedOccupancyList: Array<BedOccupancy>): Calendar {
    const calendar = new Calendar();


    // ============================================
    // Crear todos los CalendarDay
    // ============================================
    for (const rate of rates) {
      const roomTypeId = rate.roomTypeId;
      const timestamp = rate.date.getTime();

      let timeline = calendar.roomTypes.get(roomTypeId);

      if (!timeline) {
        timeline = new Map<number, CalendarDay>();
        calendar.roomTypes.set(roomTypeId, timeline);
      }

      if (timeline.has(timestamp)) {
        throw new Error("RATE_DUPLICATION");
      }

      timeline.set(timestamp, new CalendarDay(rate));
    }

    // ============================================
    // 2. Agregar la ocupacion.
    // ============================================

    for (const occupancy of bedOccupancyList) {
      const timestamp = occupancy.getDate().getTime();
      const roomTypeId = occupancy.getRoomTypeId();

      let timeline = calendar.roomTypes.get(roomTypeId);

      if (!timeline) {
        throw new Error("ROOM_TYPE_NOT_FOUND");
      }

      let calendarDay = timeline.get(timestamp);

      if (!calendarDay) {
        throw new Error("RATE_NOT_FOUND");
      }

      calendarDay.addOccupancy(occupancy.getBedId(), occupancy.getReservationId());
    }

    return calendar;
  }

  public getDay(roomTypeId: number, timestamp: number): CalendarDay {
    const timeline = this.roomTypes.get(roomTypeId);

    if (!timeline) {
      throw new Error("ROOM_TYPE_NOT_FOUND");
    }

    const day = timeline.get(timestamp);

    if (!day) {
      throw new Error("DAY_NOT_FOUND");
    }

    return day
  }

  public nextDay(date: number): number {
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    return next.getTime()
  }
}

class CalendarDay {
  private readonly occupancy = new Map<number, number>

  constructor(
    private readonly rate: RatesAndAvailability,
  ) {
    this.rate = rate;
  }

  public checkRoomsToSell(qty: number): void {
    if (this.rate.roomsToSell < qty) {
      throw new Error("NOT_AVAILABLE");
    }
  }

  public checkAvailability(qty: number): void {
    const occupiedBeds = this.getOccupiedBedsCount();
    const roomsToSell = this.rate.roomsToSell;

    if (roomsToSell - occupiedBeds < qty) {
      throw new Error("NOT_AVAILABLE");
    }
  }

  public getRate(): RatesAndAvailability {
    return this.rate;
  }

  public getOccupancy() {
    return this.occupancy;
  }

  public getOccupiedBedsCount(): number {
    return this.occupancy.size;
  }

  public addOccupancy(bedId: number, reservationId: number) {
    if (this.occupancy.has(bedId)) {
      throw new Error("DOUBLE_ASSIGNMENT");
    }
    this.occupancy.set(bedId, reservationId)
  }
}

