import { Currencies } from "../value-objects/Currencies";

export interface ICurrenciesRepository {
  // Get property currencies.
  get(propertyId: number): Promise<Currencies>;
  // Save property currencies.
  save(currencies: Currencies): Promise<void>;


}
