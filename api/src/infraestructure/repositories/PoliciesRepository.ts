import { IPoliciesRepository } from "../../domain/ports/IPoliciesRepository";
import { CancellationPolicies } from "../../domain/value-objects/CancellationPolicies";
import { GeneralPolicies } from "../../domain/value-objects/GeneralPolicies";
import { MinorPolicies } from "../../domain/value-objects/MinorPolicies";
import { OtherPolicies } from "../../domain/value-objects/OtherPolicies";
import { PaymentPolicies } from "../../domain/value-objects/PaymentPolicies";
import { Policies } from "../../domain/value-objects/Policies";
import { UnitOfWork } from "../transactions/UnitOfWork";

export class PoliciesRepository implements IPoliciesRepository {
  constructor(private readonly uow: UnitOfWork) {
    this.uow = uow;
  }

  async getPolicies(propertyId: number): Promise<Policies> {
    const generalPolicies = await this.getGeneralPolicies(propertyId);
    const paymentPolicies = await this.getPaymentPolicies(propertyId);
    const minorPolicies = await this.getMinorPolicies(propertyId);
    const otherPolicies = await this.getOtherPolicies(propertyId);

    return new Policies(propertyId, generalPolicies, paymentPolicies, minorPolicies, otherPolicies);
  }
  // General Policies
  async getGeneralPolicies(propertyId: number): Promise<GeneralPolicies> {
    const query = "SELECT * FROM general_policies WHERE property_id = $1 LIMIT 1";

    const result = await this.uow.query(query, [propertyId]);

    const data = result.rows[0];

    return new GeneralPolicies(
      data.id || null,
      data.min_length_stay || null,
      data.max_length_stay || null,
      data.min_advance_booking || null,
      data.check_in_from || null,
      data.check_out_from || null,
      data.check_in_until || null,
      data.check_out_until || null,
      data.updated_at || null,
      data.updated_by || null
    )
  }

  async saveGeneralPolicies(general: GeneralPolicies): Promise<GeneralPolicies> {
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
                   $1, $2, $3, $4, $5, $6, $7, $8, $9, $10      
                  ) ON CONFLICT (property_id) DO UPDATE
                  SET 
                  min_length_stay = EXCLUDED.min_length_stay,
                  max_length_stay = EXCLUDED.max_length_stay,
                  min_advance_booking = EXCLUDED.min_advance_booking,
                  check_in_from = EXCLUDED.check_in_from,
                  check_out_from = EXCLUDED.check_out_from,
                  check_in_until = EXCLUDED.check_in_until,
                  check_out_until = EXCLUDED.check_out_until,
                  updated_at = EXCLUDED.updated_at,
                  updated_by = EXCLUDED.updated_by;`;

    await this.uow.query(query, [
      general.propertyId,
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

    return general;
  }

  async getPaymentPolicies(propertyId: number): Promise<PaymentPolicies> {
    const query = "SELECT * FROM payment_policies WHERE property_id = $1 LIMIT 1";

    const result = await this.uow.query(query, [propertyId]);

    const data = result.rows[0];

    return new PaymentPolicies(
      data.id,
      data.advance_payment_required ?? null,
      data.deposit_amount ?? null,
      data.updated_at ?? null,
      data.updated_by ?? null
    );
  }

  async savePaymentPolicies(paymentPolicies: PaymentPolicies): Promise<PaymentPolicies> {
    const query = `INSERT INTO payment_policies (property_id, advance_payment_required, deposit_amount, updated_at, updated_by) 
                    VALUES ($1, $2, $3, $4, $5)
                    ON CONFLICT (property_id) DO UPDATE SET 
                    advance_payment_required = EXCLUDED.advance_payment_required, 
                    deposit_amount = EXCLUDED.deposit_amount, 
                    updated_at = EXCLUDED.updated_at, 
                    updated_by = EXCLUDED.updated_by;`;

    await this.uow.query(query, [
      paymentPolicies.propertyId,
      paymentPolicies.advancePaymentRequired,
      paymentPolicies.depositAmount,
      paymentPolicies.updatedAt,
      paymentPolicies.updatedBy
    ])


    return paymentPolicies;
  };

  async getMinorPolicies(propertyId: number): Promise<MinorPolicies> {
    const query = "SELECT * FROM minor_policies WHERE property_id = $1 LIMIT 1;";

    const result = await this.uow.query(query, [propertyId]);


    const data = result.rows[0];

    return new MinorPolicies(
      data.id ?? null,
      data.min_check_in_age ?? null,
      data.accept_children ?? null,
      data.minor_adult_supervision ?? null,
      data.min_child_age ?? null,
      data.free_stay_age ?? null,
      data.updated_at ?? null,
      data.updated_by ?? null
    );
  }

  async saveMinorPolicies(minorPolicies: MinorPolicies): Promise<MinorPolicies> {
    const query = `INSERT INTO minor_policies (property_id, min_check_in_age, accept_children, minor_adult_supervision, min_child_age, free_stay_age, updated_at, updated_by)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    ON CONFLICT (property_id) DO UPDATE SET
                    min_check_in_age = EXCLUDED.min_check_in_age,
                    accept_children = EXCLUDED.accept_children,
                    minor_adult_supervision = EXCLUDED.minor_adult_supervision,
                    min_child_age = EXCLUDED.min_child_age,
                    free_stay_age = EXCLUDED.free_stay_age,
                    updated_at = EXCLUDED.updated_at,
                    updated_by = EXCLUDED.updated_by;`;

    await this.uow.query(query, [
      minorPolicies.propertyId,
      minorPolicies.minCheckInAge,
      minorPolicies.acceptChildren,
      minorPolicies.minorAdultSupervision,
      minorPolicies.minChildAge,
      minorPolicies.freeStayAge,
      minorPolicies.updatedAt,
      minorPolicies.updatedBy
    ])

    return minorPolicies;
  }

  // Other Policies
  async getOtherPolicies(propertyId: number): Promise<OtherPolicies> {
    const query = "SELECT * FROM other_policies WHERE property_id = $1;";

    const result = await this.uow.query(query, [propertyId]);
    const data = result.rows[0];

    return new OtherPolicies(
      data.id ?? null,
      data.quiet_hours_from ?? null,
      data.quiet_hours_until ?? null,
      data.has_smooking_areas ?? null,
      data.allow_external_guest ?? null,
      data.allow_pets ?? null,
      data.updated_at ?? null,
      data.updated_by ?? null
    );

  }

  async saveOtherPolicies(otherPolicies: OtherPolicies): Promise<OtherPolicies> {
    const query = `INSERT INTO other_policies (property_id, quiet_hours_from, quiet_hours_until, has_smooking_areas, allow_external_guest, allow_pets, updated_at, updated_by)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    ON CONFLICT (property_id) DO UPDATE SET 
                    quiet_hours_from = EXCLUDED.quiet_hours_from,
                    quiet_hours_until = EXCLUDED.quiet_hours_until,
                    has_smooking_areas = EXCLUDED.has_smooking_areas,
                    allow_external_guest = EXCLUDED.allow_external_guest,
                    allow_pets = EXCLUDED.allow_pets,
                    updated_at = EXCLUDED.updated_at,
                    updated_by = EXCLUDED.updated_by;`;

    await this.uow.query(query, [
      otherPolicies.propertyId,
      otherPolicies.quietHoursFrom,
      otherPolicies.quietHoursUntil,
      otherPolicies.hasSmookingAreas,
      otherPolicies.allowExternalGuest,
      otherPolicies.allowPets,
      otherPolicies.updatedAt,
      otherPolicies.updatedBy
    ]);

    return otherPolicies;
  }

  async saveCancellationPolicies(cancellationPolicies: CancellationPolicies): Promise<CancellationPolicies> {
    const query = `INSERT INTO cancellationPolicies
                    (propertyId, days_before_arrival, amount_refund, updated_at, updated_by) 
                    VALUES ($1, $2, $3, $4, $5)
                    ON CONFLICT (property_id)
                    DO UPDATE SET 
                    days_before_arrival = EXCLUDED.days_before_arrival,
                    amount_refund = EXCLUDED.amount_refund,
                    updated_at = EXCLUDED.updated_at,
                    updated_by = EXCLUDED.updated_by;`;

    await this.uow.query(query, [
      cancellationPolicies.propertyId,
      cancellationPolicies.dayBeforeArrival,
      cancellationPolicies.amountRefund,
      cancellationPolicies.updatedAt,
      cancellationPolicies.updatedBy
    ]);

    return cancellationPolicies
  }
}
