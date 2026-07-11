import { BreakfastDTO } from "../domain/dto/BreakfastDTO";
import { Breakfast } from "../domain/entities/Breakfast";
import { IBreakfastAndMealRepository } from "../domain/ports/IBreakfastAndMealRepositry";

export class BreakfastAndMealService {
  constructor(
    private readonly breakfastRepository: IBreakfastAndMealRepository
  ) {
    this.breakfastRepository = breakfastRepository;
  }

  public async getBreakfastSettigs(propertyId: number): Promise<Breakfast> {
    const breakfast = await this.breakfastRepository.getBreakfastSettings(propertyId);

    if (!breakfast) {
      throw new Error("BREAKFAST_NOT_SET");
    };

    return breakfast;
  }

  public async saveBreakfastSettings(userId: number, breakfastDTO: BreakfastDTO): Promise<BreakfastDTO> {
    let breakfast = await this.breakfastRepository.getBreakfastSettings(breakfastDTO.propertyId);

    if (!breakfast) {
      breakfast = Breakfast.make(breakfastDTO, userId);

    } else {
      breakfast.update(breakfastDTO, userId)
    }

    await this.breakfastRepository.save(breakfast);

    return breakfastDTO;

  }
}
