import { RatesAndAvailabilityDTO, RatesAndAvailabilityOutputDTO } from "../domain/dto/RatesAndAvailabilityDTO";
import { RatesAndAvailability } from "../domain/entities/RatesAndAvailability";
import { IRatesAndAvailabilityService } from "../domain/interfaces/IRatesAndAvailabilityService";
import { IRatesAndAvailabilityRepository } from "../domain/ports/IRatesAndAvailabilityRepository";

export class RatesAndAvailabilityService implements IRatesAndAvailabilityService {
  constructor(
    private readonly ratesAndAvailabilityRepository: IRatesAndAvailabilityRepository,
  ) {
    this.ratesAndAvailabilityRepository = ratesAndAvailabilityRepository;
  }

  async createOrUpdate(propertyId: number, userId: number, dto: RatesAndAvailabilityDTO): Promise<RatesAndAvailabilityOutputDTO> {
    // 1. Comprobar que el cuarto correspnode a la propiedad.

    // 2. Buscar tarifa y disponibilidad para el dia.
    let currentRate = await this.ratesAndAvailabilityRepository.getRateByDate(propertyId, dto.date);

    // 2. Si hay una tarifa y disponibilidad establecia para el dia en cuestion. Se actualiza.
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



}
