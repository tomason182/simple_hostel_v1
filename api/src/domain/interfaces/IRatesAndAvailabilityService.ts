import { RatesAndAvailabilityDTO, RatesAndAvailabilityOutputDTO } from "../dto/RatesAndAvailabilityDTO";

export interface IRatesAndAvailabilityService {
  createOrUpdate(propertyId: number, userId: number, dto: RatesAndAvailabilityDTO): Promise<RatesAndAvailabilityOutputDTO>;
}
