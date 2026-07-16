import { Reservation } from "../entities/Reservation";
import { RoomType } from "../entities/RoomTypes";
import { SelectedRoom } from "../value-objects/SelectedRoom";

export interface IReservationRepository {
  save(reservation: Reservation): Promise<Reservation>;

  hasUpcomingReservations(roomTypeId: number, today: Date): Promise<boolean>;

  getReservationsByPeriodAndRooms(propertyId: number, roomTypes: Array<SelectedRoom>, checkIn: Date, checkOut: Date): Promise<Array<Reservation>>;

  getReservationsByRoomTypeAndPeriod(roomType: RoomType, firstIn: Date, lastOut: Date): Promise<Array<Reservation>>;
}
