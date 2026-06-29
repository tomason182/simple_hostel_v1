import { UserRole } from "../entities/AccessControl";
import { RoomTypeDTO } from "../dto/RoomTypeDTO";


export interface IRoomTypeService {
  // Crear roomtype.
  createRoomType(propertyId: number, userId: number, userRole: UserRole, roomType: RoomTypeDTO): Promise<{ msg: string }>;

  // Actualizar roomtype.
  updateRoomType(propertyId: number, userId: number, userRole: UserRole, roomType: RoomTypeDTO): Promise<{ msg: string }>;

  // Eliminar un roomtype.
  deleteRoomType(propertyId: number, userId: number, userRole: UserRole, roomTypeId: number): Promise<{ msg: string }>;

  // Traer todos los room types.
  getAllRoomTypes(propertyId: number): Promise<Array<RoomTypeDTO>>;
}
