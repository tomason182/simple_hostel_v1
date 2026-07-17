import { Bed, BedType } from "../../domain/entities/Bed";
import { Room } from "../../domain/entities/Room";
import { Gender, RoomType, RoomTypeLiteral } from "../../domain/entities/RoomTypes";
import { IRoomTypeRepository } from "../../domain/ports/IRoomTypeRepository";
import { UnitOfWork } from "../transactions/UnitOfWork";

interface RoomTypeRow {
  id: number;
  property_id: number;
  description: string;
  type: RoomTypeLiteral;
  gender: Gender;
}

interface RoomRow {
  id: number;
  room_type_id: number;
  name: string;
}

interface BedRow {
  id: number;
  room_id: number;
  bed_number: number,
  bed_type: BedType
}

export class RoomTypeRepository implements IRoomTypeRepository {
  constructor(private readonly uow: UnitOfWork) {
    this.uow = uow;
  }

  public async save(roomType: RoomType): Promise<RoomType> {

    const roomTypeQuery = "INSERT INTO room_type (property_id, description, type, gender) VALUES ($1, $2, $3, $4) RETURNING id;";
    const roomTypeResult = await this.uow.query<RoomTypeRow>(roomTypeQuery, [
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
      const roomResult = await this.uow.query<RoomRow>(roomQuery, [roomType.getId(), room.getName()]);
      room.setId(roomResult.rows[0].id);

      const beds = room.getBeds();
      for (const bed of beds) {
        const bedResult = await this.uow.query<BedRow>(bedQuery, [room.getId(), bed.bedNumber, bed.bedType]);
        bed.setId(bedResult.rows[0].id);
      }
    }

    return roomType;

  }

  public async findById(id: number): Promise<RoomType | null> {
    const roomTypeQuery = "SELECT * FROM room_type WHERE id = $1;";
    const roomsQuery = "SELECT * FROM room WHERE room_type_id = $1;";
    const bedsQuery = "SELECT * FROM bed WHERE room_id = ANY($1);";

    const roomTypeResult = await this.uow.query<RoomTypeRow>(roomTypeQuery, [id]);

    if (!roomTypeResult.rows[0]) {
      return null;
    }

    const roomsResult = await this.uow.query<RoomRow>(roomsQuery, [id]);

    const roomIds = roomsResult.rows.map(row => row.id);

    const bedsResult = await this.uow.query<BedRow>(bedsQuery, [roomIds]);

    const bedsByRoomId = new Map<number, Array<Bed>>();

    for (const row of bedsResult.rows) {
      let beds = bedsByRoomId.get(row.room_id);

      if (!beds) {
        beds = [];
        bedsByRoomId.set(row.room_id, beds);
      }
      beds.push(new Bed(row.id, row.bed_number, row.bed_type));

    }
    let rooms: Array<Room> = [];

    for (const room of roomsResult.rows) {
      const beds = bedsByRoomId.get(room.id) ?? [];

      rooms.push(new Room(room.id, room.name, beds));
    }

    const data = roomTypeResult.rows[0];

    const roomType = new RoomType(data.id, data.property_id, data.description, data.type, data.gender, rooms);
    return roomType

  }

  public async getAllRoomTypes(propertyId: number): Promise<Array<RoomType>> {
    const roomTypesQuery = "SELECT * FROM room_type WHERE property_id = $1;";
    const roomsQuery = "SELECT * FROM room WHERE room_type_id = ANY($1);";
    const bedsQuery = "SELECT * FROM bed WHERE room_id = ANY($1);";

    const roomTypesResult = await this.uow.query<RoomTypeRow>(roomTypesQuery, [propertyId]);

    let roomTypes: Array<RoomType> = [];

    if (roomTypesResult.rows.length === 0) {
      return [];
    }

    const roomTypeIds = roomTypesResult.rows.map(row => row.id);

    const roomsResult = await this.uow.query<RoomRow>(roomsQuery, [roomTypeIds]);
    const roomIds = roomsResult.rows.map(row => row.id);

    const bedsResult = await this.uow.query<BedRow>(bedsQuery, [roomIds]);

    const bedsByRoomId = new Map<number, Bed[]>();

    for (const row of bedsResult.rows) {
      let beds = bedsByRoomId.get(row.room_id);

      if (!beds) {
        beds = [];
        bedsByRoomId.set(row.room_id, beds);
      }

      beds.push(new Bed(row.id, row.bed_number, row.bed_type));
    }

    const roomsByRoomTypeId = new Map<number, Array<Room>>();

    for (const row of roomsResult.rows) {
      let rooms = roomsByRoomTypeId.get(row.room_type_id);

      if (!rooms) {
        rooms = [];
        roomsByRoomTypeId.set(row.room_type_id, rooms);
      }

      const beds = bedsByRoomId.get(row.id) ?? [];

      rooms.push(new Room(row.id, row.name, beds));
    }

    for (const row of roomTypesResult.rows) {
      const rooms = roomsByRoomTypeId.get(row.id) ?? [];

      roomTypes.push(new RoomType(row.id, row.property_id, row.description, row.type, row.gender, rooms));
    }

    return roomTypes
  }
} 
