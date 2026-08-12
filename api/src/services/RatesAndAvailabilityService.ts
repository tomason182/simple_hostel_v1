import { RatesAndAvailabilityDTO, RatesAndAvailabilityOutputDTO } from "../domain/dto/RatesAndAvailabilityDTO";
import { RatesAndAvailability } from "../domain/entities/RatesAndAvailability";
import { IRatesAndAvailabilityService } from "../domain/interfaces/IRatesAndAvailabilityService";
import { IRatesAndAvailabilityRepository } from "../domain/ports/IRatesAndAvailabilityRepository";
import { IReservationRepository } from "../domain/ports/IReservationRepository";
import { IRoomTypeRepository } from "../domain/ports/IRoomTypeRepository";
import { AppError } from "../errors/AppError";

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
    if (dtos.length > 365) {
      throw new AppError("La cantidad maxima de tarifas a establecer es de 365 dias", 400, "EXCEED_RATES_AVAILABILITY")
    }

    // 2. Se podria chequear que el listado de tarifas correspondan todas al mismo roomType.
    const roomTypeId = dtos[0].roomTypeId;
    const invalidRoomTypes = dtos.filter(d => d.roomTypeId !== roomTypeId);

    if (invalidRoomTypes.length > 0) {
      throw new AppError("La lista debe contener los mismo roomTypes", 400, "INVALID_ROOM_TYPE_LIST");
    };

    const sortedDtos = [...dtos].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const reservationList = await this.reservationRepository.getByRoomTypeAndDateRange(roomTypeId, sortedDtos[0].date, sortedDtos[sortedDtos.length - 1].date);

  }



}
