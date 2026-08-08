import { RoomType } from "../entities/RoomTypes";

export interface IRoomTypeRepository {

  findById(id: number): Promise<RoomType | null>;

  getAllRoomTypes(propertyId: number): Promise<RoomType[]>;

  save(roomType: RoomType): Promise<RoomType>;
}
