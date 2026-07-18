import { BreakfastInputDTO, BreakfastOutputDTO } from "../domain/dto/BreakfastDTO";
import { Breakfast } from "../domain/entities/Breakfast";
import { IBreakfastAndMealService } from "../domain/interfaces/IBreakfastAndMealService";
import { IBreakfastAndMealRepository } from "../domain/ports/IBreakfastAndMealRepositry";

export class BreakfastAndMealService implements IBreakfastAndMealService {
  constructor(
    private readonly breakfastRepository: IBreakfastAndMealRepository
  ) {
    this.breakfastRepository = breakfastRepository;
  }

  public async getBreakfastSettings(propertyId: number): Promise<BreakfastOutputDTO> {
    const breakfast = await this.breakfastRepository.getBreakfastSettings(propertyId);

    if (!breakfast) {
      throw new Error("BREAKFAST_NOT_SET");
    };

    return breakfast;
  }

  public async saveOrUpdateBreakfastSettings(propertyId: number, userId: number, breakfastDTO: BreakfastInputDTO): Promise<BreakfastOutputDTO> {
    let breakfast = await this.breakfastRepository.getBreakfastSettings(propertyId);

    if (!breakfast) {
      breakfast = Breakfast.make(breakfastDTO, userId, propertyId);

    } else {
      breakfast.update(breakfastDTO, userId, propertyId)
    }

    await this.breakfastRepository.save(breakfast);

    return breakfast.toOutPutDTO();

  }
}
