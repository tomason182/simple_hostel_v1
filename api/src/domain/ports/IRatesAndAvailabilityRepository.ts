import { RatesAndAvailability } from "../entities/RatesAndAvailability";
import { SelectedRoom } from "../value-objects/SelectedRoom";

export interface IRatesAndAvailabilityRepository {
  getRatesByPeriodAndRooms(propertyId: number, roomTypes: Array<SelectedRoom>, checkIn: Date, checkOut: Date): Promise<Array<RatesAndAvailability>>;

  getRateByDate(propertyId: number, date: Date): Promise<RatesAndAvailability | null>;

  save(propertyId: number, rate: RatesAndAvailability): Promise<void>;

  saveBulk(rates: RatesAndAvailability[]): Promise<void>
}
