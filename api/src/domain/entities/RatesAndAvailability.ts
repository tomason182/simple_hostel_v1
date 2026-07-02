import { ReservationDTO } from "../dto/ReservationDTO";
import { SelectedRoom } from "../value-objects/SelectedRoom";
import { Reservation } from "./Reservation";

export class RatesAndAvailability {
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

  public calculateAvailability(reservations: Array<Reservation>): number {
    // Filtrar las reservas por dia.

    let quantity = 0;
    for (const reservation of reservations) {
      if (!reservation.isActiveOn(this.date)) {
        continue
      }

      quantity += reservation.getQuantity(this.roomTypeId);
    }

    return this.roomsToSell - quantity

  }


  public checkConstrains(checkIn: Date, checkOut: Date): void {
    if (!this.date) {
      throw new Error("EMPTY_DATE");
    }
    if (!this.customRate) {
      throw new Error("RATES_NULL_VALUE");
    }

    if (this.customRate <= 0) {
      throw new Error("INVALID_RATES_VALUES")
    }

    // Chequear que el valor minimo no exceda un porcentaje del valor maximo.
    // Esto me da la seguridad de q no va a haber nada tipo [23,23,1], lo cual sugeriria una mala configuracion de rates.


    // Chequear que rango de fechas coincida con el solicitado.
    if (this.date.getTime() < checkIn.getTime() || this.date.getTime() >= checkOut.getTime()) {
      throw new Error("INVALID_RATES_VALUES");
    }
  }

  // METODOS DE CLASE
  static validateRatePeriod(rates: Array<RatesAndAvailability>, selectedRoomIds: Array<number>, checkIn: Date, checkOut: Date): void {
    // agrupar tarifas por tipo de cuarto.
    const mappedRates = new Map<number, Map<number, RatesAndAvailability>>();

    for (const rate of rates) {

      const roomRates = mappedRates.get(rate.roomTypeId);
      const timestamp = rate.date.getTime();

      if (!roomRates) {
        const roomRate = new Map<number, RatesAndAvailability>();
        roomRate.set(timestamp, rate);

        mappedRates.set(rate.roomTypeId, roomRate);
        continue;
      }

      // Detectar que no hay duplicado
      if (roomRates.has(timestamp)) {
        throw new Error("DUPICATED_RATE_CONFIG");
      }
      const newRoomRate = new Map<number, RatesAndAvailability>();
      newRoomRate.set(timestamp, rate);
      mappedRates.set(rate.roomTypeId, newRoomRate);
    }

    for (const roomTypeId of selectedRoomIds) {
      // comprobar que esten todos los dias. 
      const roomRate = mappedRates.get(roomTypeId);
      if (!roomRate) {
        throw new Error("MISSING_RATE_CONFIG");
      }

      for (let date = checkIn.getTime(); date < checkOut.getTime(); date = this.nextDay(new Date(date))) {
        if (!roomRate.has(date)) {
          throw new Error("MISSING_RATE_CONFIG")
        }
      }
    }

  }

  static nextDay(date: Date): number {
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    return next.getTime()
  }



}
