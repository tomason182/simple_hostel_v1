import { UserRole } from "../entities/AccessControl";
import { RoomTypeRequestDTO, RoomTypeResponseDTO } from "../dto/RoomTypeDTO";


export interface IRoomTypeService {
  // Crear roomtype.
  createRoomType(propertyId: number, userId: number, roomType: RoomTypeRequestDTO): Promise<{ msg: string }>;

  // Actualizar roomtype.
  updateRoomType(propertyId: number, userId: number, roomType: RoomTypeRequestDTO): Promise<{ msg: string }>;

  // Eliminar un roomtype.
  deleteRoomType(propertyId: number, userId: number, roomTypeId: number): Promise<{ msg: string }>;

  // Traer todos los room types.
  getAllRoomTypes(propertyId: number): Promise<RoomTypeResponseDTO[]>;
}
