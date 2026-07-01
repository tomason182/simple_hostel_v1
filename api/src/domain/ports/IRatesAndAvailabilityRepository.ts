import { RatesAndAvailability } from "../entities/RatesAndAvailability";
import { SelectedRooms } from "../value-objects/SelectedRooms";

export interface IRatesAndAvailabilityRepository {
  getDateRange(propertyId: number, roomTypes: Array<SelectedRooms>, checkIn: Date, checkOut: Date): Promise<Array<RatesAndAvailability>>;
}
