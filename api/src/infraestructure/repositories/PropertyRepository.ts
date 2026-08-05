import { Property } from "../../domain/entities/Property";
import { IPropertyRepository } from "../../domain/ports/IPropertyRepository";
import { Address } from "../../domain/value-objects/Address";
import { ContactInfo } from "../../domain/value-objects/ContactInfo";
import { Currencies } from "../../domain/value-objects/Currencies";
import { UnitOfWork } from "../transactions/UnitOfWork";

export class PropertyRepository implements IPropertyRepository {
  constructor(private readonly uow: UnitOfWork) {
    this.uow = uow;
  }

  async save(property: Property): Promise<Property> {
    const query = `INSERT INTO properties (
                      property_name, 
                      description, 
                      status,  
                      created_at, 
                      updated_at
                  ) VALUES ( $1, $2, $3, $4, $5 )
                  RETURNING id`;

    const result = await this.uow.query(query, [
      property.propertyName,
      property.description,
      property.status,
      property.createdAt,
      property.updatedAt
    ]);

    const id = result.rows[0].id;

    property.setId(id);
    return property;
  }

  async updateDescription(property: Property): Promise<void> {
    const query = "INSERT INTO property (description) VALUES ($1)";
    await this.uow.query(query, [property.description]);
  }

  // =======================================
  // Contact info
  // =======================================
  async getContactInfo(propertyId: number): Promise<ContactInfo | null> {
    const query = "SELECT * FROM contact_info WHERE property_id = $1 LIMIT 1";

    const result = await this.uow.query(query, [propertyId]);
    const data = result.rows[0];

    if (!data) {
      return null;
    }

    return new ContactInfo(
      data.email,
      data.phone_calls_code,
      data.phone_calls,
      data.phone_whatsapp_code,
      data.phone_whatsapp,
      data.updated_by,
      data.updated_at
    );
  };

  async saveContactInfo(propertyId: number, contactInfo: ContactInfo): Promise<void> {
    const query = `INSERT INTO contact_info (
                    property_id, 
                    email, 
                    phone_calls_code, 
                    phone_calls, 
                    phone_whatsapp_code,
                    phone_whatsapp,
                    updated_by,
                    updated_at
                  ) VALUES (
                    $1, 
                    $2, 
                    $3, 
                    $4, 
                    $5, 
                    $6, 
                    $7, 
                    $8
                  ) ON CONFLICT (property_id)
                    DO UPDATE 
                    SET 
                      email = EXCLUDED.email,
                      phone_calls_code = EXCLUDED.phone_calls_code,
                      phone_calls = EXCLUDED.phone_calls,
                      phone_whatsapp_code = EXCLUDED.phone_whatsapp_code,
                      phone_whatsapp = EXCLUDED.phone_whatsapp,
                      updated_by = EXCLUDED.updated_by,
                      updated_at = EXCLUDED.updated_at
                    ;`;

    await this.uow.query(query, [
      propertyId,
      contactInfo.email,
      contactInfo.phoneCallsCode,
      contactInfo.phoneCalls,
      contactInfo.phoneWhatsappCode,
      contactInfo.phoneWhatsapp,
      contactInfo.updatedBy,
      contactInfo.updatedAt
    ])
  }

  // ======================================================
  // Address
  // ======================================================
  async getAddress(propertyId: number): Promise<Address | null> {
    const query = "SELECT * FROM address WHERE property_id = $1 LIMIT 1";

    const result = await this.uow.query(query, [propertyId]);

    const data = result.rows[0];

    if (!data) return null;

    return new Address(
      data.house_number,
      data.street,
      data.city,
      data.postal_code,
      data.state,
      data.country,
      data.alpha_2_code,
      data.lat,
      data.lon,
      data.osm_id,
      data.updated_by,
      data.updated_at
    )
  }

  async saveAddress(propertyId: number, address: Address): Promise<void> {
    const query = ` INSERT INTO address (
                          property_id,
                          house_number,
                          street,
                          city,
                          postal_code,
                          state,
                          country,
                          alpha_2_code,
                          lat,
                          lon,
                          osm_id,
                          updated_by,
                          updated_at
                      ) VALUES (
                          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
                      ) ON CONFLICT (property_id) DO UPDATE
                          SET 
                            house_number = EXCLUDED.house_number,
                            street = EXCLUDED.street,
                            city = EXCLUDED.city,
                            postal_code = EXCLUDED.postal_code,
                            state = EXCLUDED.state,
                            country = EXCLUDED.country,
                            alpha_2_code = EXCLUDED.alpha_2_code,
                            lat = EXCLUDED.lat,
                            lon = EXCLUDED.lon,
                            osm_id = EXCLUDED.osm_id,
                            updated_by = EXCLUDED.updated_by,
                            updated_at = EXCLUDED.updated_at;`;

    await this.uow.query(query, [
      propertyId,
      address.houseNumber,
      address.street,
      address.city,
      address.postalCode,
      address.state,
      address.country,
      address.alpha2code,
      address.lat,
      address.lon,
      address.osmId,
      address.updatedBy,
      address.updatedAt
    ]);

  }

  // ============================================
  // Currencies
  // ============================================
  async getCurrencies(propertyId: number): Promise<Currencies> {
    const query = "SELECT * FROM currencies WHERE property_id = $1;";

    const result = await this.uow.query(query, [propertyId]);
    const data = result.rows[0];

    const currencies = new Currencies();
    currencies.setId(data.id ?? null);
    currencies.setBaseCurrency(data.base_currency ?? null);
    currencies.setPaymentCurrency(data.payment_currency ?? null);
    currencies.updatedAt = data.updated_at ?? null;
    currencies.updatedBy = data.updatedBy ?? null;

    return currencies;
  }

  async saveCurrencies(currencies: Currencies): Promise<Currencies> {
    const query = `INSERT INTO currencies (
                                  property_id,
                                  base_currency,
                                  payment_currency,
                                  updatedAt,
                                  updatedBy )
                  VALUES( 
                      $1,
                      $2,
                      $3,
                      $4,
                      $5) ON CONFLICT (property_id) DO UPDATE
                  SET
                    base_currency = EXCLUDED.base_currency,
                    payment_currency = EXCLUDED.payment_currency,
                    updatedAt = EXCLUDED.updatedAt,
                    updatedBy = EXCLUDED.updatedBy;`

    await this.uow.query(query, [
      currencies.getId(),
      currencies.getBaseCurrency(),
      currencies.getPaymentCurrency(),
      currencies.updatedAt,
      currencies.updatedBy
    ]);

    return currencies;

  }


}
