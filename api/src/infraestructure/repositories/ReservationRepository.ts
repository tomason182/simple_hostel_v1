import { Reservation } from "../../domain/entities/Reservation";
import { RoomType } from "../../domain/entities/RoomTypes";
import { IReservationRepository } from "../../domain/ports/IReservationRepository";
import { SelectedRoom } from "../../domain/value-objects/SelectedRoom";
import { UnitOfWork } from "../transactions/UnitOfWork";

export class ReservationRepository implements IReservationRepository {
  constructor(private readonly uow: UnitOfWork) {
    this.uow = uow;
  }

  async save(reservation: Reservation): Promise<Reservation> {

    const params = [
      reservation.guestId,
      reservation.propertyId,
      reservation.bookingSource,
      reservation.reservationStatus,
      reservation.paymentStatus,
      reservation.currency,
      reservation.checkIn,
      reservation.checkOut,
      reservation.specialRequest,
      reservation.createdBy,
      reservation.updatedBy,
      reservation.createdAt,
      reservation.updatedAt,
      reservation.getTotalAmount(),
      reservation.getAdvancePaymentAmount()
    ]

    const id = reservation.getId();
    let query;

    if (id !== null) {
      params.push(id);
      query = `UPDATE reservation 
                SET
                  guest_id = $1,
                  property_id = $2,
                  booking_source = $3,
                  reservation_status = $4,
                  payment_status = $5,
                  currency = $6,
                  check_in = $7,
                  check_out = $8,
                  special_request = $9,
                  created_by = $10,
                  updated_by = $11,
                  created_at = $12,
                  updated_at = $13,
                  total_amount = $14,
                  advance_payment_amount = $15
                WHERE
                  id = $16;`;
    } else {
      query = `INSERT INTO reservation (
                        guest_id,
                        property_id,
                        booking_source,
                        reservation_status,
                        payment_status,
                        currency,
                        check_in,
                        check_out,
                        special_request,
                        created_by,
                        updated_by,
                        created_at,
                        updated_at,
                        total_amount,
                        advance_payment_amount
                      ) VALUES (
                        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
                      ) RETURNING id;`;

    }

    const result = await this.uow.query(query, params);
    if (id === null) {
      const id = result.rows[0].id;
      reservation.setId(id);
      const selectedRooms = reservation.getSelectedRooms();

      for (const selectedRoom of selectedRooms) {
        // 1. Posiblemente reservation_id y room_type_id deban ser un par Unique (reservation_id, room_type_id).
        // 2. Los cuartos seleccionados solamente se insertan en SAVE. Si el usuario desea actualizarlos debe haber una funcion especifica updateSelectedRooms.
        const selectedRoomQuery = "INSERT INTO selected_room (reservation_id, room_type_id, quantity) VALUES ($1, $2, $3);";
        await this.uow.query(selectedRoomQuery, [id, selectedRoom.getRoomTypeId(), selectedRoom.getQuantity()]);
      }
    }

    return reservation;
  }

  async hasUpcomingReservations(roomTypeId: number, today: Date): Promise<boolean> {

  }

  async getReservationsByPeriodAndRooms(propertyId: number, roomTypes: Array<SelectedRoom>, checkIn: Date, checkOut: Date): Promise<Array<Reservation>> {

  }

  async getReservationsByRoomTypeAndPeriod(roomType: RoomType, firstIn: Date, lastOut: Date): Promise<Array<Reservation>> {

  }

}
