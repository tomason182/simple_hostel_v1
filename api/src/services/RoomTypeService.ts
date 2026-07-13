import { RoomTypeDTO } from "../domain/dto/RoomTypeDTO";
import { RoomType } from "../domain/entities/RoomTypes";
import { UserRole } from "../domain/entities/AccessControl";
import { IRoomTypeService } from "../domain/interfaces/IRoomTypeService";
import { IRoomTypeRepository } from "../domain/ports/IRoomTypeRepository";
import { IReservationRepository } from "../domain/ports/IReservationRepository";

export class RoomTypeService implements IRoomTypeService {
  private roomTypeRepository: IRoomTypeRepository;
  private reservationRepository: IReservationRepository;
  private BED_LIMIT: number = 50;

  constructor(roomTypeRepository: IRoomTypeRepository, reservationRepository: IReservationRepository) {
    this.roomTypeRepository = roomTypeRepository;
    this.reservationRepository = reservationRepository;
  }

  async createRoomType(propertyId: number, userId: number, userRole: UserRole, roomTypeDTO: RoomTypeDTO): Promise<{ msg: string; }> {
    // 1. Comprobar que el usuario tenga permisos para crear un RoomType.
    // Se puede hacer en las rutas, en el accessControl para este caso de uso (accessControl.checkCanCreateRoomType());

    // Crear el RoomTYpe.
    const newRoomType = RoomType.make(propertyId, roomTypeDTO.description, roomTypeDTO.type, roomTypeDTO.gender, roomTypeDTO.inventory, roomTypeDTO.maxOccupancy);

    // Traer todos los roomtypes de la propiedad.
    const roomTypes = await this.roomTypeRepository.getAllRoomTypes(propertyId);

    // Hacer chequeos
    // cantidad maxima de camas admitida.
    // No permitir misma description en los tipos de cuartos.

    // 5. Guardar el RoomType
    await this.roomTypeRepository.save(newRoomType);

    return { msg: "ROOM_TYPE_CREATED" };
  }

  async updateRoomType(propertyId: number, userId: number, userRole: UserRole, roomTypeDTO: RoomTypeDTO): Promise<{ msg: string; }> {
    // 1. Comprobar que el usuario tenga permisos para actualizar un RoomType.

    // 2. Crear el roomType.
    const currentRoomType = RoomType.make(propertyId, roomTypeDTO.description, roomTypeDTO.type, roomTypeDTO.gender, roomTypeDTO.inventory, roomTypeDTO.maxOccupancy);
    const id = currentRoomType.getId();


    // 3. Buscar el roomType a actualizar
    const oldRoomType = await this.roomTypeRepository.findById(id);

    if (oldRoomType === null) {
      throw new Error("ROOM_TYPE_DONT_EXITS");
    }

    // Traer todos los roomtypes de la propiedasd.
    const roomTypes = await this.roomTypeRepository.getAllRoomTypes(propertyId);
    // Chequeos para actualizar un Room Type.
    let bedsCount = 0;
    for (const room of roomTypes) {
      if (room.getDescription() === currentRoomType.getDescription()) {
        throw new Error("DUPLICATED_DESCRIPTION_NAME");
      }
      bedsCount += room.getBeds().length
    }

    if (bedsCount + currentRoomType.getBeds().length > this.BED_LIMIT) {
      throw new Error("BED_LIMIT_EXCEED")
    }

    await this.roomTypeRepository.save(currentRoomType);

    return { msg: "ROOM_TYPE_UPDATED" }

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
