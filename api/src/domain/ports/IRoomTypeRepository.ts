import { RoomType } from "../entities/RoomTypes";

export interface IRoomTypeRepository {

  findById(id: number): Promise<RoomType | null>;

  findByGroup(propertyId: number, roomtypes: Array<RoomType>): Promise<Array<RoomType>>;

  findRoomTypeByDescription(propertyId: number, roomTypeDescription: string): Promise<RoomType | null>;

  getAllPropertyBeds(propertyId: number): Promise<number>;

  getAllRoomTypes(propertyId: number): Promise<Array<RoomType> | []>;

  save(roomType: RoomType): Promise<void>;
}
