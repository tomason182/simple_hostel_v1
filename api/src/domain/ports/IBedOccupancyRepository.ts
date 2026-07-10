import { BedOccupancy } from "../entities/BedOccupancy";

export interface BedOccupancyRepository {
  getOccupancy(roomTypeId: number, checkIn: Date, checkOut: Date): Promise<Array<BedOccupancy>>
}
