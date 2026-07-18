import { BreakfastInputDTO, BreakfastOutputDTO } from "../dto/BreakfastDTO";

export interface IBreakfastAndMealService {
  getBreakfastSettings(propertyId: number): Promise<BreakfastOutputDTO>;

  saveOrUpdateBreakfastSettings(propertyId: number, userId: number, dto: BreakfastInputDTO): Promise<BreakfastOutputDTO>
}
