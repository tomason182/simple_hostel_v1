import { ReservationDTO } from "../dto/ReservationDTO";
import { SelectedRooms } from "../value-objects/SelectedRooms";
import { Reservation } from "./Reservation";
import { RoomType } from "./RoomTypes";

export class RatesAndAvailability {
  private availability?: number;
  constructor(
    public id: number | null,
    public propertyId: number,
    public roomTypeId: number,
    public date: Date,
    public customRate: number,
    public roomsToSell: number,
    public createdBy: number,
    public createdAt: Date
  ) {
    this.id = id;
    this.propertyId = propertyId;
    this.roomTypeId = roomTypeId;
    this.date = date;
    this.customRate = customRate;
    this.roomsToSell = roomsToSell;
    this.createdBy = createdBy;
    this.createdAt = createdAt;

  }

  private nextDate(date: number): number {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    return nextDate.getTime();

  }

  public setAvailability(rates: Array<RatesAndAvailability>, reservations: Array<Reservation>, checkIn: Date, checkOut: Date): Array<RatesAndAvailability> {
    // filtar las tarifas por rango de fechas.
    const filteredRates = rates.filter(r => r.date.getTime() >= checkIn.getTime() && r.date.getTime() < checkOut.getTime());
    // filtar las reservas.
    for (const fr of filteredRates) {
      // Filtramos las reservas por tipo de cuarto.
      const filteredReservationsByRoomType = Reservation.filterByRoomType(reservations, fr.roomTypeId);


      const filteredReservationsByDate = filteredReservationsByRoomType.filter(r => r.checkIn.getTime() <= fr.date.getTime() && r.checkOut.getTime() > fr.date.getTime());


    }


  }


  private checkRatesConstrains(rates: Array<RatesAndAvailability>, checkIn: Date, checkOut: Date, rooms: SelectedRooms | null): void {
    if (rates.length === 0) {
      throw new Error("EMPTY_RATE_RANGE");
    }
    if (checkOut <= checkIn) {
      throw new Error("INVALID_CHECK_IN_CHECK_OUT_RANGE");
    }
    if (rates.some(rate => rate.customRate === null)) {
      throw new Error("RATE_RANGE_HAS_NULL_VALUES");
    }

    if (rates.some(rate => rate.customRate <= 0)) {
      throw new Error("INVALID_RATES_VALUES");
    }

    // Chequear que el valor minimo no exceda un porcentaje del valor maximo.
    // Esto me da la seguridad de q no va a haber nada tipo [23,23,1], lo cual sugeriria una mala configuracion de rates.
    const customRate = rates.map(rate => rate.customRate);
    const minRate = Math.min(...customRate);
    const maxRate = Math.max(...customRate);
    if (minRate < maxRate * 0.2) {
      throw new Error("RATE_RANGE_HAS_INCONCISTEN_AMOUNT")
    }

    // Chequear que rango de fechas coincida con el solicitado.
    const { minDate, maxDate } = rates.reduce((acc, rate) => ({
      minDate: rate.date < acc.minDate ? rate.date : acc.minDate,
      maxDate: rate.date > acc.maxDate ? rate.date : acc.maxDate
    }),
      {
        minDate: rates[0].date,
        maxDate: rates[0].date
      });

    const prevDate = new Date(checkOut);
    prevDate.setDate(prevDate.getDate() - 1);

    if (minDate.getTime() !== checkIn.getTime() || maxDate.getTime() !== prevDate.getTime()) {
      throw new Error("INVALID_RATES_RANGE")
    }
  }


}
