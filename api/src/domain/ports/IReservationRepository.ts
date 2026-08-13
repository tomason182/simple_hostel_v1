import { Reservation } from "../entities/Reservation";

export interface IReservationRepository {
  save(reservation: Reservation): Promise<Reservation>;

  countByRoomTypeAndDate(roomTypeId: number, date: Date): Promise<number>;

  getByRoomTypeAndDateRange(roomTypeId: number, from: Date, to: Date): Promise<Reservation[]>;

  getByRoomTypeAndDate(roomTypeId: number, date: Date): Promise<Reservation[]>;
}
