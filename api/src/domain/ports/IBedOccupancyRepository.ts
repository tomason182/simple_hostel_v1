import { BedOccupancy } from "../entities/BedOccupancy";

export interface IBedOccupancyRepository {
  save(occupancy: BedOccupancy): Promise<void>;

  get(propertyId: number, checkIn: Date, checkOut: Date): Promise<Array<BedOccupancy>>
}
