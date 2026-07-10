import { Reservation } from "../entities/Reservation";
import { BedOccupancy } from "../entities/BedOccupancy";
import { Calendar } from "../entities/Calendar";
import { RatesAndAvailability } from "../entities/RatesAndAvailability";
import { SelectedRoom } from "../value-objects/SelectedRoom";

export interface IBedOccupancyService {
  assignBeds(reservation: Reservation, calendar: Calendar): Promise<void>;

  getOccupancyList(selectedRooms: Array<SelectedRoom>, checkIn: Date, checkOut: Date): Promise<Array<BedOccupancy>>
}
