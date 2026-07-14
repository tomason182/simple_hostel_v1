import { Property } from "../../domain/entities/Property";
import { IPropertyRepository } from "../../domain/ports/IPropertyRepository";
import { ContactInfo } from "../../domain/value-objects/ContactInfo";
import { UnitOfWork } from "../transactions/UnitOfWork";

export class PropertyRepository implements IPropertyRepository {
  constructor(private readonly uow: UnitOfWork) {
    this.uow = uow;
  }

  async save(property: Property): Promise<Property> {
    const query = `INSERT INTO property (
                      property_name, 
                      description, 
                      property_status, 
                      profile_status, 
                      created_at, 
                      updated_at
                  ) VALUES ( $1, $2, $3, $4, $5, $6 );
                  RETURNING id`;

    const result = await this.uow.query(query, [
      property.propertyName,
      property.description,
      property.status,
      property.profileStatus,
      property.createdAt,
      property.updatedAt
    ]);

    const id = result.rows[0].id;

    property.setId(id);
    return property;
  }

  // =======================================
  // Contact info
  // =======================================
  async getContactInfo(propertyId: number): Promise<ContactInfo | null> {
    const query = "SELECT FROM contact_info WHERE property_id = $1";

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
}
