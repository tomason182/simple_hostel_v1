import { BedOccupancy } from "../../domain/entities/BedOccupancy";
import { IBedOccupancyRepository } from "../../domain/ports/IBedOccupancyRepository";
import { SelectedRoom } from "../../domain/value-objects/SelectedRoom";
import { UnitOfWork } from "../transactions/UnitOfWork";

interface BedOccupancyRow {
  id: number,
  reservation_id: number,
  room_type_id: number,
  bed_id: number,
  check_in: Date,
  check_out: Date
}

export class BedOccupancyRepository implements IBedOccupancyRepository {
  constructor(private readonly uow: UnitOfWork) {
    this.uow = uow;
  }

  async getOccupancyByRoomType(roomTypeId: number, checkIn: Date, checkOut: Date): Promise<Array<BedOccupancy>> {
    // Occupancy: Se optiene el conjunto de reservas que comple con: CHECKOUT > checkIn && CHECKIN < checkOut 
    const query = "SELECT * FROM bed_occupancy WHERE room_type_id = $1 AND check_in < $3 AND check_out > $2";

    const result = await this.uow.query(query, [roomTypeId, checkIn, checkOut]);

    return result.rows.map(row =>
      new BedOccupancy(row.id, row.reservation_id, row.bed_id, row.room_type_id, row.check_in, row.check_out)
    )
  }

  async getOccupancyBySelectedRooms(selectedRooms: Array<SelectedRoom>, checkIn: Date, checkOut: Date): Promise<Array<BedOccupancy>> {

    const roomTypeIds = selectedRooms.map(r => r.getRoomTypeId());

    if (roomTypeIds.length === 0) {
      return [];
    }

    const query = "SELECT * FROM bed_occupancy WHERE room_type_id = ANY($1) AND check_in < $3 AND check_out > $2"

    const result = await this.uow.query(query, [roomTypeIds, checkIn, checkOut]);

    return result.rows.map(row =>
      new BedOccupancy(row.id, row.reservation_id, row.bed_id, row.room_type_id, row.check_in, row.check_out)
    );
  }


}

