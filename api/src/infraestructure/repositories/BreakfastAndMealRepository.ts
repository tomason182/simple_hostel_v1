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

    return new Breakfast(
      propertyId,
      data.is_inclueded ?? null,
      data.is_served ?? null,
      data.price ?? null,
      data.from ?? null,
      data.to ?? null,
      data.updated_by ?? null,
      data.updated_at ?? null
    );
  }

  async save(breakfast: Breakfast): Promise<void> {
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
      breakfast.propertyId,
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
