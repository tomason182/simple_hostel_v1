import { Reservation } from "../entities/Reservation";
import { SelectedRoom } from "../value-objects/SelectedRoom";

export interface IReservationRepository {
  hasUpcomingReservations(roomTypeId: number, today: Date): Promise<boolean>;
  getReservationsByPeriodAndRooms(propertyId: number, roomTypes: Array<SelectedRoom>, checkIn: Date, checkOut: Date): Promise<Array<Reservation>>
}
