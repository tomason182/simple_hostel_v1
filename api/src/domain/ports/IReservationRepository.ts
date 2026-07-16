import { Reservation } from "../entities/Reservation";
import { RoomType } from "../entities/RoomTypes";
import { SelectedRoom } from "../value-objects/SelectedRoom";

export interface IReservationRepository {
  save(reservation: Reservation): Promise<Reservation>;
}
