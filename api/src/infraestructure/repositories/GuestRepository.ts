import { Guest } from "../../domain/entities/Guest";
import { IGuestRepository } from "../../domain/ports/IGuestRepository";
import { UnitOfWork } from "../transactions/UnitOfWork";

export class GuestRepository implements IGuestRepository {
  constructor(private readonly uow: UnitOfWork) {
    this.uow = uow;
  }

  async save(guest: Guest): Promise<Guest> {
    let query = null;
    const guestId = guest.getId();

    const params = [
      guest.propertyId,
      guest.firstName,
      guest.lastName,
      guest.idNumber,
      guest.email,
      guest.phoneNumber,
      guest.phoneCode,
      guest.street,
      guest.city,
      guest.country,
      guest.alpa2code,
      guest.createdBy,
      guest.createdAt,
      guest.updatedBy,
      guest.updatedAt];

    if (guestId !== null) {
      params.push(guestId);
      query = `UPDATE guest
               SET property_id = $1, 
                   first_name = $2, 
                   last_name = $3,
                   id_number = $4,
                   email = $5,
                   phone_number = $6,
                   phone_code = $7,
                   street = $8,
                   city = $9,
                   country = $10,
                   alpha_2_code = $ 11,
                   created_by = $12,
                   created_at = $13,
                   updated_by = $14,
                   updated_at = $15
                WHERE
                  id = $16;`
    } else {
      query = `INSERT INTO guest (
        property_id, 
        first_name, 
        last_name, 
        id_number, 
        email, 
        phone_number,
        phone_code, 
        street, 
        city, 
        country, 
        alpha_2_code, 
        created_by, 
        created_at, 
        updated_by, 
        updated_at) 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id;`

    }

    const result = await this.uow.query(query, params);

    if (guestId === null) {
      const id = result.rows[0].id;
      guest.setId(id)
    }

    return guest;
  }

  async findById(guestId: number): Promise<Guest | null> {
    const query = "SELECT * FROM guest WHERE guest_id = $1;";
    const result = await this.uow.query(query, [guestId]);

    const data = result.rows[0];
    if (!data) {
      return null;
    }

    return new Guest(
      data.id,
      data.property_id,
      data.first_name,
      data.last_name,
      data.id_number,
      data.email,
      data.phone_number,
      data.phone_code,
      data.street,
      data.city,
      data.country,
      data.alpha_2_code,
      data.created_by,
      data.updated_by,
      data.created_at,
      data.updated_at
    );
  }

  async findByEmail(propertyId: number, email: string): Promise<Guest | null> {
    const query = "SELECT * FROM guest WHERE property_id = $1 AND email = $2;";

    const result = await this.uow.query(query, [propertyId, email]);
    const data = result.rows[0];

    if (!data) {
      return null
    }

    return new Guest(
      data.id,
      data.property_id,
      data.first_name,
      data.last_name,
      data.id_number,
      data.email,
      data.phone_number,
      data.phone_code,
      data.street,
      data.city,
      data.country,
      data.alpha_2_code,
      data.created_by,
      data.updated_by,
      data.created_at,
      data.updated_at
    );
  }
}
