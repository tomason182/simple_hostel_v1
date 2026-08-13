import { RatesAndAvailabilityDTO, RatesAndAvailabilityOutputDTO } from "../domain/dto/RatesAndAvailabilityDTO";
import { RatesAndAvailability } from "../domain/entities/RatesAndAvailability";
import { IRatesAndAvailabilityService } from "../domain/interfaces/IRatesAndAvailabilityService";
import { IRatesAndAvailabilityRepository } from "../domain/ports/IRatesAndAvailabilityRepository";
import { IReservationRepository } from "../domain/ports/IReservationRepository";
import { IRoomTypeRepository } from "../domain/ports/IRoomTypeRepository";
import { AppError } from "../errors/AppError";
import { addDays } from "../utils/dateUtils";

export class RatesAndAvailabilityService implements IRatesAndAvailabilityService {
  constructor(
    private readonly roomTypeRepository: IRoomTypeRepository,
    private readonly reservationRepository: IReservationRepository,
    private readonly ratesAndAvailabilityRepository: IRatesAndAvailabilityRepository,
  ) {
    this.roomTypeRepository = roomTypeRepository;
    this.reservationRepository = reservationRepository;
    this.ratesAndAvailabilityRepository = ratesAndAvailabilityRepository;
  }

  async createOrUpdate(propertyId: number, userId: number, dto: RatesAndAvailabilityDTO): Promise<RatesAndAvailabilityOutputDTO> {
    // 1. Buscar el tipo de cuarto.
    const roomType = await this.roomTypeRepository.findById(dto.roomTypeId);

    if (!roomType) {
      throw new AppError("ROOM_TYPE_NOT_FOUND", 404, "ROOM_TYPE_NOT_FOUND");
    }

    const reservationCount = await this.reservationRepository.countByRoomTypeAndDate(dto.roomTypeId, dto.date)

    // 2. Chequear roomsToSell
    roomType.checkRoomsToSell(dto.roomsToSell, reservationCount);

    // 2. Buscar tarifa y disponibilidad para el dia.
    let currentRate = await this.ratesAndAvailabilityRepository.getRateByDate(propertyId, dto.date);

    // 2. Si hay una tarifa establecia para el dia en cuestion. Se actualiza.
    // Ver si son necesaria restricciones para actualizar una tarifa.
    // Habria que comprobar por ejemplo que los cuartos a la venta no sean mayores a los establecidos en el RoomType
    if (!currentRate) {
      currentRate = RatesAndAvailability.fromDTO(propertyId, userId, dto);
    } else {
      currentRate.update(propertyId, userId, dto);
    }

    // 3. Guardar.
    await this.ratesAndAvailabilityRepository.save(propertyId, currentRate);

    return currentRate.toDTO()
  }

  async createOrUpdteBulk(propertyId: number, userId: number, dtos: RatesAndAvailabilityDTO[]): Promise<void> {
    // 1. Se podria chequear que el listado de tarifas no exceda el año.
    if (dtos.length === 0) {
      throw new AppError("La lista de tarifas no puede estar vacia", 400, "EMPTY_RATES_AVAILABILITY");
    }
    if (dtos.length > 365) {
      throw new AppError("La cantidad maxima de tarifas a establecer es de 365 dias", 400, "EXCEED_RATES_AVAILABILITY")
    }

    // 2. Se podria chequear que el listado de tarifas correspondan todas al mismo roomType.
    const roomTypeId = dtos[0].roomTypeId;
    const invalidRoomTypes = dtos.filter(d => d.roomTypeId !== roomTypeId);

    if (invalidRoomTypes.length > 0) {
      throw new AppError("La lista debe contener los mismo roomTypes", 400, "INVALID_ROOM_TYPE_LIST");
    };

    // 3. Buscamos el tipo de cuarto para el cual se quieren crear tarifas.
    const roomType = await this.roomTypeRepository.findById(roomTypeId);

    if (!roomType) {
      throw new AppError("ROOM_TYPE_NOT_FOUND", 400, "ROOM_TYPE_NOT_FOUND");
    }

    if (roomType.propertyId !== propertyId) {
      throw new AppError("RoomType no corresponde a la propiedad", 400, "INVALID_ROOM_TYPE");
    }

    // 4. Ordenamos los dtos para obtener las fechas "desde" y "hasta" cuando se quiere actualizar.
    const sortedDtos = [...dtos].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const from = sortedDtos[0].date;
    const to = sortedDtos[sortedDtos.length - 1].date;

    // 5. Buscamos las reservas vigentes para ese rango de fechas y tipo de cuarto.
    const reservationList = await this.reservationRepository.getByRoomTypeAndDateRange(roomTypeId, from, to);

    // 6. Obtenemos el inventario del cuarto.
    // En RoomType el inventario representa la cantidad de cuartos.
    // Aqui diferenciamos entre "PRIVATE" Y "DORM".
    // Para PRIVATE el inventario representa la cantidad de cuartos y para DORM representa la cantidad de camas.
    const inventory = roomType.type === "PRIVATE" ? roomType.calcInventory() : roomType.calcMaxOccupancy();

    // 7. Iteramos los dtos recividos con el fin de chequear que los roomsToSell (cuartos o camas a la venta) enviados en cada uno,
    // es menor o igual a las camas o cuartos libres. Distingimos entre cuartos privados y cuartos compartidos.
    for (const dto of dtos) {
      const activeReservations = reservationList.filter(r => r.isActiveOn(dto.date));

      let occupancy = 0;

      // 8. Podemos establecer que si el cuarto es privado cada reserva asociada corresponde a un caurto
      // y si el cuarto es compartido, debemos obtener en la reserva la cantidad de camas reservadas para ese cuarto
      // Tener en cuenta que una reserva puede tener varios tipos de cuartos seleccionados.
      if (roomType.type === "PRIVATE") {
        occupancy = activeReservations.length;
      } else if (roomType.type === "DORM") {
        for (const reservation of activeReservations) {
          const rooms = reservation.getSelectedRooms()
          const room = rooms.find(r => r.getRoomTypeId() === roomTypeId);

          if (!room) continue;

          occupancy += room.getQuantity();
        }
      } else {
        throw new Error("INVALID_ROOM_TYPE")
      }

      if (inventory - occupancy < dto.roomsToSell) {
        throw new AppError("INVALID_ROOM_TO_SELL_AMOUNT", 400, "INVALID_ROOM_TO_SELL_AMOUNT")
      }
    }

    // 9. Se no hubo conflicto guardar (crear o actualizar)
    await this.ratesAndAvailabilityRepository.saveBulk(propertyId, dtos);

  }



}
