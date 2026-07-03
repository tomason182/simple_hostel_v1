import { RatesAndAvailability } from "../entities/RatesAndAvailability";
import { SelectedRoom } from "../value-objects/SelectedRoom";

export interface IRatesAndAvailabilityRepository {
  getRatesByPeriodAndRooms(propertyId: number, roomTypes: Array<SelectedRoom>, checkIn: Date, checkOut: Date): Promise<Array<RatesAndAvailability>>;
}
