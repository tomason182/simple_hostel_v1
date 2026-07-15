import { Property } from "../../domain/entities/Property";
import { IPropertyRepository } from "../../domain/ports/IPropertyRepository";
import { Address } from "../../domain/value-objects/Address";
import { ContactInfo } from "../../domain/value-objects/ContactInfo";
import { GeneralPolicies } from "../../domain/value-objects/GeneralPolicies";
import { MinorPolicies } from "../../domain/value-objects/MinorPolicies";
import { OtherPolicies } from "../../domain/value-objects/OtherPolicies";
import { PaymentPolicies } from "../../domain/value-objects/PaymentPolicies";
import { Policies } from "../../domain/value-objects/Policies";
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

  async findById(propertyId: number): Promise<Property | null> {
    const query = "SELECT * FROM property WHERE property_id = $1;";
    const result = await this.uow.query(query, [propertyId]);
    const data = result.rows[0];

    if (!data) {
      return null;
    };

    const address = await this.getAddress(propertyId);
    const contactInfo = await this.getContactInfo(propertyId);
    const policies = await this.getPolicies(propertyId);
    const profileStatus = "INCOMPLETE";   // Aca se comprueba si el perfil esta completo o no.

    return new Property(data.id, data.property_name, address, contactInfo, policies, null, data.description, data.created_at, data.updated_at, data.status, profileStatus)

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
                          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
                      ) ON CONFLICT (property_id) DO UPDATE
                          SET 
                            house_number = EXCLUDED.house_number,
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

  // ===========================================================
  // Policies
  // ===========================================================
  async getPolicies(propertyId: number): Promise<Policies | null> {
    const generalPolicies = await this.getGeneralPolicies(propertyId);
    const paymentPolicies = await this.getPaymentPolicies(propertyId);
    const minorPolicies = await this.getMinorPolicies(propertyId);
    const otherPolicies = await this.getOtherPolicies(propertyId);

    return new Policies(generalPolicies, paymentPolicies, minorPolicies, otherPolicies);
  }
  // General Policies
  async getGeneralPolicies(propertyId: number): Promise<GeneralPolicies | null> {
    const query = "SELECT * FROM general_policies WHERE property_id = $1 LIMIT 1";

    const result = await this.uow.query(query, [propertyId]);

    const data = result.rows[0];
    if (!data) {
      return null;
    }
    return new GeneralPolicies(
      data.min_length_stay,
      data.max_length_stay,
      data.min_advance_booking,
      data.check_in_from,
      data.check_out_from,
      data.check_in_until,
      data.check_out_until,
      data.updated_at,
      data.updated_by
    )
  }

  async saveGeneralPolicies(propertyId: number, general: GeneralPolicies): Promise<void> {
    const query = `INSERT INTO general_policies (
                      property_id,
                      min_length_stay, 
                      max_length_stay, 
                      min_advance_booking, 
                      check_in_from, 
                      check_out_from, 
                      check_in_until, 
                      check_out_until, 
                      updated_at, 
                      updated_by
                  ) VALUES (
                   $1, $2, $3, $4, $5, $6, $7, $8, $9       
                  ) ON CONFLICT (property_id) DO UPDATE
                  SET 
                  min_length_stay = EXCLUDED.min_length_stay,
                  max_length_stay = EXCLUDED.max_length_stay,
                  min_advance_booking = EXCLUDED min_advance_booking,
                  check_in_from = EXCLUDED check_in_from,
                  check_out_from = EXCLUDED check_out_from,
                  check_in_until = EXCLUDED check_in_until,
                  check_out_until = EXCLUDED check_out_until,
                  updated_at = EXCLUDED updated_at,
                  updated_by = EXCLUDED updated_by;`;

    await this.uow.query(query, [
      propertyId,
      general.minLengthStay,
      general.maxLengthStay,
      general.minAdvanceBooking,
      general.checkInFrom,
      general.checkOutFrom,
      general.checkInUntil,
      general.checkOutUntil,
      general.updatedAt,
      general.updatedBy
    ])
  }

  async getPaymentPolicies(propertyId: number): Promise<PaymentPolicies | null> {
    const query = "SELECT * FROM payment_policies WHERE property_id = $1 LIMIT 1";

    const result = await this.uow.query(query, [propertyId]);

    const data = result.rows[0];

    if (!data) return null;

    return new PaymentPolicies(data.advance_payment_required, data.deposit_amount, data.updated_at, data.updated_by);
  }

  async savePaymentPolicies(propertyId: number, paymentPolicies: PaymentPolicies): Promise<void> {
    const query = `INSERT INTO payment_policies (property_id, advance_payment_required, deposit_amount, updated_at, updated_by) 
                    VALUES ($1, $2, $3, $4, $5)
                    ON CONFLICT (property_id) SET 
                    advance_payment_required = EXCLUDED.advance_payment_required, 
                    deposit_amount = EXCLUDED.deposit_amount, 
                    updated_at = EXCLUDED.updated_at, 
                    updated_by = EXCLUDED.updated_by;`;

    await this.uow.query(query, [
      propertyId,
      paymentPolicies.advancePaymentRequired,
      paymentPolicies.depositAmount,
      paymentPolicies.updatedAt,
      paymentPolicies.updatedBy
    ])
  };

  async getMinorPolicies(propertyId: number): Promise<MinorPolicies | null> {
    const query = "SELECT * FROM minor_policies WHERE property_id = $1 LIMIT 1;";

    const result = await this.uow.query(query, [propertyId]);

    const data = result.rows[0];
    if (!data) return null;

    return new MinorPolicies(data.min_check_in_age, data.accept_children, data.minors_adult_supervision, data.min_child_age, data.free_stay_age, data.updated_at, data.updated_by);
  }

  async saveMinorPolicies(propertyId: number, minorPolicies: MinorPolicies): Promise<void> {
    const query = `INSERT INTO minor_policies (property_id, min_check_in_age, accept_children, minors_adult_supervision, min_child_age, free_stay_age, updated_at, updated_by)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    ON CONFLICT (property_id) SET
                    min_check_in_age = EXCLUDED.min_check_in_age,
                    accept_children = EXCLUDED.accept_children,
                    minors_adult_supervision = EXCLUDED.minors_adult_supervision,
                    min_child_age = EXCLUDED.min_child_age,
                    free_stay_age = EXCLUDED.free_stay_age,
                    updated_at = EXCLUDED.updated_at,
                    updated_by = EXCLUDED.updated_by;`;

    await this.uow.query(query, [
      propertyId,
      minorPolicies.minCheckInAge,
      minorPolicies.acceptChildren,
      minorPolicies.minorsAdultSupervision,
      minorPolicies.minChildAge,
      minorPolicies.freeStayAge,
      minorPolicies.updatedAt,
      minorPolicies.updatedBy
    ])
  }

  // Other Policies
  async getOtherPolicies(propertyId: number): Promise<OtherPolicies | null> {
    const query = "SELECT * FROM other_policies WHERE property_id = $1;";

    const result = await this.uow.query(query, [propertyId]);
    const data = result.rows[0];

    if (!data) {
      return null;
    }

    return new OtherPolicies(data.quiet_hours_from, data.quiet_hours_until, data.has_smooking_areas, data.allow_external_guest, data.allow_pets, data.updated_at, data.updated_by,);

  }

  async saveOtherPolicies(propertyId: number, otherPolicies: OtherPolicies): Promise<void> {
    const query = `INSERT INTO other_policies (property_id, quiet_hours_from, quiet_hours_until, has_smooking_areas, allow_external_guest, allow_pets, updated_at, updated_by)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    ON CONFLICT (property_id) SET 
                    quiet_hours_from = EXCLUDED.quiet_hours_from,
                    quiet_hours_until = EXCLUDED.quiet_hours_until,
                    has_smooking_areas = EXCLUDED.has_smooking_areas,
                    allow_external_guest = EXCLUDED.allow_external_guest,
                    allow_pets = EXCLUDED.allow_pets,
                    updated_at = EXCLUDED.updated_at,
                    updated_by = EXCLUDED.updated_by;
                    `;

    await this.uow.query(query, [
      propertyId,
      otherPolicies.quietHoursFrom,
      otherPolicies.quietHoursUntil,
      otherPolicies.hasSmookingAreas,
      otherPolicies.allowExternalGuest,
      otherPolicies.allowPets,
      otherPolicies.updatedAt,
      otherPolicies.updatedBy
    ])
  }
}
