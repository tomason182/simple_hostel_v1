import { RoomTypeDTO } from "../domain/dto/RoomTypeDTO";
import { RoomType } from "../domain/entities/RoomTypes";
import { UserRole } from "../domain/entities/AccessControl";
import { IRoomTypeService } from "../domain/interfaces/IRoomTypeService";
import { IRoomTypeRepository } from "../domain/ports/IRoomTypeRepository";

export class RoomTypeService implements IRoomTypeService {
  roomTypeRepository: IRoomTypeRepository;
  constructor(roomTypeRepository: IRoomTypeRepository) {
    this.roomTypeRepository = roomTypeRepository;
  }

  async createRoomType(propertyId: number, userId: number, userRole: UserRole, roomTypeDTO: RoomTypeDTO): Promise<{ msg: string; }> {
    // 1. Comprobar que el usuario tenga permisos para crear un RoomType.
    // Se puede hacer en las rutas, en el accessControl para este caso de uso (accessControl.checkCanCreateRoomType());

    // Crear el RoomTYpe.
    const newRoomType = RoomType.fromDTO(roomTypeDTO);

    // Traer todos los roomtypes de la propiedad.
    const roomTypes = await this.roomTypeRepository.getAllRoomTypes(propertyId);

    // Hacer chequeos.
    newRoomType.checkSameDescription(roomTypes);
    newRoomType.checkBedsLimit(roomTypes);

    // 5. Guardar el RoomType
    await this.roomTypeRepository.save(newRoomType);

    return { msg: "ROOM_TYPE_CREATED" };
  }

  async updateRoomType(propertyId: number, userId: number, userRole: UserRole, roomTypeDTO: RoomTypeDTO): Promise<{ msg: string; }> {
    // 1. Comprobar que el usuario tenga permisos para actualizar un RoomType.

    // Crear el roomType.
    const currentRoomType = RoomType.fromDTO(roomTypeDTO);
    const id = currentRoomType.getId();


    // Buscar el roomType a actualizar
    const oldRoomType = await this.roomTypeRepository.findById(id);

    if (oldRoomType === null) {
      throw new Error("ROOM_TYPE_DONT_EXITS");
    }
    const roomTypes = await this.roomTypeRepository.getAllRoomTypes(propertyId);
    // Chequeos para actualizar un Room Type.
    oldRoomType.checkSameDescription(roomTypes);

    const hasInventoryChange = oldRoomType.checkInventoryChange(currentRoomType);

    if (hasInventoryChange === 1) {
      // Chequear si hay reservas de HOY en adelante para ese tipo de cuarto.
      // Si hay reservas implicaria que el usuario quiere disminur el inventario teniendo reservas pendientes.
      // No se permite. Arroja error.
    } else {

    }
    // 2. Buscar si existe un RoomType con la misma descripcion.


    await this.roomTypeRepository.save(oldRoomType);
    // 3. Buscar el roomType por id.

    // 4. Actualizar el roomTyep.

    // 5. Guardar.
  }

  async deleteRoomType(propertyId: number, userId: number, userRole: UserRole, roomTypeId: number): Promise<{ msg: string; }> {
    // 1. Comprobar que el usuario tenga permisos para eliminar un RoomType.

    // 2. Comprobar si el cuarto tiene reservas proximas.

    // 3. En lugar de eliminar se cambia es status a false.
  }

  async getAllRoomTypes(propertyId: number): Promise<Array<RoomTypeDTO>> {
    // 1. Buscar todos los roomTypes de la propiedad.

    // 
  }

}; 
