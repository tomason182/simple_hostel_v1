import { Breakfast } from "../entities/Breakfast";

export interface IBreakfastAndMealRepository {
  getBreakfastSettings(propertyId: number): Promise<Breakfast | null>;
  save(breakfast: Breakfast): Promise<void>;
}
