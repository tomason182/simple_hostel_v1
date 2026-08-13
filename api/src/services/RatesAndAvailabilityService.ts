import { RatesAndAvailabilityBulkDTO, RatesAndAvailabilityDTO, RatesAndAvailabilityOutputDTO } from "../domain/dto/RatesAndAvailabilityDTO";
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

    if (roomType.propertyId !== propertyId) {
      throw new AppError("RoomType no corresponde a la propiedad", 400, "INVALID_ROOM_TYPE");
    }


    const reservations = await this.reservationRepository.getByRoomTypeAndDate(dto.roomTypeId, dto.date);

    const inventory = roomType.type === "PRIVATE" ? roomType.calcInventory() : roomType.calcMaxOccupancy();

    let occupancy = 0;

    if (roomType.type === "PRIVATE") {
      occupancy = reservations.length;
    } else if (roomType.type === "DORM") {
      for (const reservation of reservations) {
        const rooms = reservation.getSelectedRooms()
        const room = rooms.find(r => r.getRoomTypeId() === dto.roomTypeId);

        if (!room) continue;

        occupancy += room.getQuantity();
      }
    } else {
      throw new Error("INVALID_ROOM_TYPE")
    }

    if (inventory - occupancy < dto.roomsToSell) {
      throw new AppError("Invalid roomsToSell amount", 400, "INVALID_ROOM_TO_SELL_AMOUNT")
    }

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

  async createOrUpdateBulk(propertyId: number, userId: number, dto: RatesAndAvailabilityBulkDTO): Promise<void> {
    // 1. Chequear el rango.
    if (dto.from >= dto.to) {
      throw new AppError("INVALID_DATE_RANGE", 400, "INVALID_DATE_RANGE");
    }

    const days = (dto.to.getTime() - dto.from.getTime()) / (1000 * 60 * 60 * 24);

    if (days > 365) {
      throw new AppError("EXCEED_DATE_RANGE", 400, "EXCEED_DATE_RANGE");
    }

    // 2. Se podria chequear que el listado de tarifas correspondan todas al mismo roomType.
    const roomTypeId = dto.roomTypeId;

    // 3. Buscamos el tipo de cuarto para el cual se quieren crear tarifas.
    const roomType = await this.roomTypeRepository.findById(roomTypeId);

    if (!roomType) {
      throw new AppError("ROOM_TYPE_NOT_FOUND", 400, "ROOM_TYPE_NOT_FOUND");
    }

    if (roomType.propertyId !== propertyId) {
      throw new AppError("RoomType no corresponde a la propiedad", 400, "INVALID_ROOM_TYPE");
    }

    // 5. Buscamos las reservas vigentes para ese rango de fechas y tipo de cuarto.
    const reservationList = await this.reservationRepository.getByRoomTypeAndDateRange(roomTypeId, dto.from, dto.to);

    // 6. Obtenemos el inventario del cuarto.
    const inventory = roomType.type === "PRIVATE" ? roomType.calcInventory() : roomType.calcMaxOccupancy();

    // 7. Iteramos los dtos recividos con el fin de chequear que los roomsToSell (cuartos o camas a la venta) enviados en cada uno,
    // es menor o igual a las camas o cuartos libres. Distingimos entre cuartos privados y cuartos compartidos.
    const rates: RatesAndAvailability[] = [];
    for (let date = dto.from; date < dto.to; date = addDays(date, 1)) {
      const rate: RatesAndAvailabilityDTO = {
        roomTypeId: dto.roomTypeId,
        date: date,
        roomsToSell: dto.roomsToSell,
        customRate: dto.customRate
      }
      rates.push(RatesAndAvailability.fromDTO(propertyId, userId, rate));
      const activeReservations = reservationList.filter(r => r.isActiveOn(date));

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
    await this.ratesAndAvailabilityRepository.saveBulk(rates);

  }



}
