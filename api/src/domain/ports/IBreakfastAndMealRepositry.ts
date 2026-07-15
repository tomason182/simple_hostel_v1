import { Breakfast } from "../entities/Breakfast";

export interface IBreakfastAndMealRepository {
  getBreakfastSettings(propertyId: number): Promise<Breakfast | null>;
  save(propertyId: number, breakfast: Breakfast): Promise<void>;
}
