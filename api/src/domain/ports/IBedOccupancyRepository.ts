import { BedOccupancy } from "../entities/BedOccupancy";
import { SelectedRoom } from "../value-objects/SelectedRoom";

export interface IBedOccupancyRepository {
  getOccupancyByRoomType(roomTypeId: number, checkIn: Date, checkOut: Date): Promise<Array<BedOccupancy>>;

  getOccupancyBySelectedRooms(selectedRooms: Array<SelectedRoom>, checkIn: Date, checkOut: Date): Promise<Array<BedOccupancy>>;
}
