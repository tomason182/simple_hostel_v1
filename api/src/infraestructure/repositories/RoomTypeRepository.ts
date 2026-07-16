import { RoomType } from "../../domain/entities/RoomTypes";
import { IRoomTypeRepository } from "../../domain/ports/IRoomTypeRepository";
import { UnitOfWork } from "../transactions/UnitOfWork";

export class RoomTypeRepository implements IRoomTypeRepository {
  constructor(private readonly uow: UnitOfWork) {
    this.uow = uow;
  }

  public async save(roomType: RoomType): Promise<RoomType> {

    const roomTypeQuery = "INSERT INTO room_type (property_id, description, type, gender) VALUES ($1, $2, $3, $4) RETURNING id;";
    const roomTypeResult = await this.uow.query(roomTypeQuery, [
      roomType.propertyId,
      roomType.description,
      roomType.type,
      roomType.gender
    ]);

    roomType.setId(roomTypeResult.rows[0].id);

    const rooms = roomType.getRooms();

    const roomQuery = "INSERT INTO room (room_type_id, name) VALUES ($1, $2) RETURNING id;";
    const bedQuery = "INSERT INTO bed (room_id, bed_number, bed_type) VALUES($1, $2, $3) RETURNING id;";

    for (const room of rooms) {
      const roomResult = await this.uow.query(roomQuery, [roomType.getId(), room.getName()]);
      room.setId(roomResult.rows[0].id);

      const beds = room.getBeds();
      for (const bed of beds) {
        const bedResult = await this.uow.query(bedQuery, [room.getId(), bed.bedNumber, bed.bedType]);
        bed.setId(bedResult.rows[0].id);
      }
    }

    return roomType;

  }

  public async findById(id: number): Promise<RoomType | null> {

  }

  public async getAllRoomTypes(propertyId: number): Promise<Array<RoomType> | []> {

  }
} 
