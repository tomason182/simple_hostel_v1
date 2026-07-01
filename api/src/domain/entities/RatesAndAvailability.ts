import { ReservationDTO } from "../dto/ReservationDTO";
import { SelectedRooms } from "../value-objects/SelectedRooms";

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

  static checkRatesConstrains(rates: Array<RatesAndAvailability>, dto: ReservationDTO): void {
    // primera restriccion. Sin valores NULL.
    if (rates.some(rate => rate.customRate === null)) {
      throw new Error("RATE_RANGE_HAS_NULL_VALUES");
    }

    if (rates.some(rate => rate.customRate === 0)) {
      throw new Error("RATE_RANGE_HAS_NULL_VALUES")
    }

    // Chequear que el valor minimo no exceda el 80% del valor maximo.
    // Esto me da la seguridad de q no va a haber nada tipo [23,23,1], lo cual sugeriria una mala configuracion de rates.
    const customRate = rates.map(rate => rate.customRate);
    const minRate = Math.min(...customRate);
    const maxRate = Math.max(...customRate);
    if (1 - (minRate / maxRate) < 0.75) {
      throw new Error("RATE_RANGE_HAS_INCONCISTEN_AMOUNT")
    }

    // Chequear que rango de fechas coincida con el solicitado.
    const dates = rates.map(rate => rate.date);
    const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());
    if (sortedDates[0] !== dto.checkIn || sortedDates[sortedDates.length - 1] !== dto.checkOut) {
      throw new Error("INVALID_RATES_RANGE")
    }
  }


}
