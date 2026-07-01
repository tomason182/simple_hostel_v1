import { Reservation } from "../entities/Reservation";
import { SelectedRooms } from "../value-objects/SelectedRooms";

export interface IReservationRepository {
  hasUpcomingReservations(roomTypeId: number, today: Date): Promise<boolean>;
  getReservationsByPeriodAndRooms(propertyId: number, roomTypesId: Array<SelectedRooms>, checkIn: Date, checkOut: Date): Promise<Array<Reservation>>
}
