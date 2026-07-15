import { Breakfast } from "../../domain/entities/Breakfast";
import { IBreakfastAndMealRepository } from "../../domain/ports/IBreakfastAndMealRepositry";
import { UnitOfWork } from "../transactions/UnitOfWork";

export class BreakfastAndMealRepository implements IBreakfastAndMealRepository {
  constructor(private readonly uow: UnitOfWork) {
    this.uow = uow;
  }

  async getBreakfastSettings(propertyId: number): Promise<Breakfast | null> {
    const query = "SELECT * FROM breakfast WHERE property_id = $1;";

    const result = await this.uow.query(query, [propertyId]);

    const data = result.rows[0];
    if (!data) {
      return null;
    };

    return new Breakfast(data.property_id, data.is_inclueded, data.is_served, data.price, data.from, data.to, data.updated_by, data.updated_at);
  }

  async save(propertyId: number, breakfast: Breakfast): Promise<void> {
    const query = `INSERT INTO breakfast (property_id, is_inclueded, is_served, price, from, to, updated_by, updated_at) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    ON CONFLICT (property_id) 
                    DO UPDATE SET
                    is_inclueded = EXCLUDED.is_inclueded,
                    is_served = EXCLUDED.is_served,
                    price = EXCLUDED.price,
                    from = EXCLUDED.form,
                    to = EXCLUDED.to,
                    updated_by = EXCLUDED.updated_by,
                    updated_at = EXCLUDED.updated_at;`;

    await this.uow.query(query, [
      propertyId,
      breakfast.isIncluded,
      breakfast.isServed,
      breakfast.price,
      breakfast.from,
      breakfast.to,
      breakfast.updatedBy,
      breakfast.updatedAt
    ])
  }
}
