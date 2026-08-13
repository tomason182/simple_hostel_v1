import { RatesAndAvailability } from "../../domain/entities/RatesAndAvailability";
import { IRatesAndAvailabilityRepository } from "../../domain/ports/IRatesAndAvailabilityRepository";
import { SelectedRoom } from "../../domain/value-objects/SelectedRoom";
import { UnitOfWork } from "../transactions/UnitOfWork";

export class RatesAndAvailabilityRepository implements IRatesAndAvailabilityRepository {
  constructor(private readonly uow: UnitOfWork) {
    this.uow = uow;
  }

  public async save(propertyId: number, rate: RatesAndAvailability): Promise<void> {
    const query = `INSERT INTO rates_and_availability (
                        property_id, 
                        room_type_id, 
                        date, 
                        custom_rate, 
                        rooms_to_sell, 
                        created_at,
                        updated_at,
                        updated_by
                  ) VALUES (
                        $1, 
                        $2, 
                        $3, 
                        $4, 
                        $5, 
                        $6, 
                        $7, 
                        $8
                  ) ON CONFLICT (room_type_id, date) 
                    DO UPDATE SET
                    custom_rate = EXCLUDED.custom_rate, 
                    rooms_to_sell = EXCLUDED.rooms_to_sell, 
                    updated_at = EXCLUDED.updated_at,
                    updated_by = EXCLUDED.updated_by;`;
    await this.uow.query(query, [
      propertyId,
      rate.roomTypeId,
      rate.date,
      rate.customRate,
      rate.roomsToSell,
      rate.createdAt,
      rate.updatedAt,
      rate.updatedBy
    ])
  }

  public async saveBulk(propertyId: number, rates: RatesAndAvailability[]): Promise<void> {
    const query = `INSERT INTO rates_and_availability (
                    property_id,
                    room_type_id,
                    date,
                    custom_rate,
                    rooms_to_sell,
                    created_at,
                    updated_at,
                    updated_by
                  ) SELECT * FROM UNNEST(
                      $1::bigint[], 
                      $2::bigint[], 
                      $3::date[], 
                      $4::numeric[], 
                      $5::int[], 
                      $6::timestamptz[], 
                      $7::timestamptz[], 
                      $8::bigint[]
                  ) ON CONFLICT (room_type_id, date)
                    DO UPDATE SET
                      custom_rate = EXCLUDED.custom_rate,
                      rooms_to_sell = EXCLUDED.rooms_to_sell,
                      updated_at = EXCLUDED.updated_at,
                      updated_by = EXCLUDED.updated_by;`;

    await this.uow.query(query, [
      rates.map(r => propertyId),
      rates.map(r => r.roomTypeId),
      rates.map(r => r.date),
      rates.map(r => r.customRate),
      rates.map(r => r.roomsToSell),
      rates.map(r => r.createdAt),
      rates.map(r => r.updatedAt),
      rates.map(r => r.updatedBy)
    ])
  }

  public async getRatesByPeriodAndRooms(propertyId: number, selectedRooms: Array<SelectedRoom>, checkIn: Date, checkOut: Date): Promise<Array<RatesAndAvailability>> {
    const roomTypeIds = selectedRooms.map(r => r.getRoomTypeId());

    const query = "SELECT * FROM rates_and_availability WHERE room_type_id = ANY($1) AND date >= $2 AND date < $3;";

    const result = await this.uow.query(query, [roomTypeIds, checkIn, checkOut]);

    return result.rows.map(row => new RatesAndAvailability(
      row.id,
      row.property_id,
      row.room_type_id,
      row.date,
      row.custom_rate,
      row.rooms_to_sell,
      row.created_by,
      row.created_at,
      row.updated_by,
      row.updated_at
    ));
  }

  public async getRateByDate(propertyId: number, date: Date): Promise<RatesAndAvailability | null> {
    const query = "SELECT * FROM rates_and_availability WHERE property_id = $1 AND date = $2;";

    const result = await this.uow.query(query, [propertyId, date]);

    const data = result.rows[0];
    if (!data) {
      return null;
    };

    return new RatesAndAvailability(
      data.id,
      data.property_id,
      data.room_type_id,
      data.date,
      data.custom_rate,
      data.rooms_to_sell,
      data.created_by,
      data.created_at,
      data.updated_by,
      data.updated_at
    )
  }
}
