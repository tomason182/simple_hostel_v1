import { Reservation } from "../entities/Reservation";
import { BedOccupancy } from "../entities/BedOccupancy";
import { Calendar } from "../entities/Calendar";

export interface IBedOccupancyService {
  assignBeds(reservation: Reservation, calendar: Calendar): Promise<void>;
}
