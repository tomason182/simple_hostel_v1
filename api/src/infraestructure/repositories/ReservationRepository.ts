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

  async countByRoomTypeAndDate(roomTypeId: number, date: Date): Promise<number> {

    // NOTA: ARRAY[1,2] en reservation_status rerpesentan los ids NO_SHOW y CANCELLED en tabla reservation_status
    const query = `SELECT COALESCE(SUM(ri.quantity), 0) AS quantity
                      FROM reservation r
                      INNER JOIN reservation_items ri
                      ON ri.reservation_id = r.id
                      INNER JOIN reservation_status rs
                      ON rs.id = r.reservation_status_id
                      WHERE ri.room_type_id = $1
                      AND r.check_in <= $2
                      AND r.check_out > $2
                      AND rs.is_active_inventory = TRUE;`

    const result = await this.uow.query(query, [roomTypeId, date]);

    return Number(result.rows[0].quantity);
  }

  async getByRoomTypeAndDate(roomTypeId: number, date: Date): Promise<Reservation[]> {

    // LOGICA: Obtener las reservas que de un dia y tipo de cuarto especifico. 
    const query = `SELECT r.id,
                          r.property_id,
                          r.guest_id,
                          r.check_in,
                          r.check_out,
                          r.special_request,
                          r.subtotal_amount,
                          r.discount_amount,
                          r.tax_amount,
                          r.total_amount,
                          r.required_deposit_amount,
                          r.created_at,
                          r.created_by,
                          r.updated_at,
                          r.updated_by,

                          c.code AS currency,
                          bs.description AS booking_source,
                          rs.description AS reservation_status
                    FROM reservation r
                    INNER JOIN currencies c ON c.id = r.currency_id
                    INNER JOIN booking_source bs ON bs.id = r.booking_source_id
                    INNER JOIN reservation_status rs ON rs.id = r.reservation_status_id
                    WHERE r.check_in < $1
                    AND r.check_out > $1
                    AND rs.is_active_inventory = TRUE;`;

    const result = await this.uow.query(query, [date])

    if (result.rows.length === 0) {
      return [];
    }
    // 2. Obtener los id de todas la reservas encontradas.
    const reservationIds = result.rows.map(r => r.id);

    // 3. Obtener los cuartos seleccionados de cada reserva.
    const roomsQuery = `SELECT * FROM reservation_items WHERE reservation_id = ANY($1::bigint[]) AND room_type_id = $2;`;

    const roomsResult = await this.uow.query(roomsQuery, [reservationIds, roomTypeId]);

    // 4. Crear un Map <reservation_id, selectedRooms[]>
    const roomsMap = new Map<number, SelectedRoom[]>();

    for (const row of roomsResult.rows) {
      let rooms = roomsMap.get(row.reservation_id);

      if (!rooms) {
        rooms = [];
        roomsMap.set(row.reservation_id, rooms);
      }

      rooms.push(new SelectedRoom(row.room_type_id, row.quantity));
    }

    // 5. Armar una lista con las entidades reservas.

    const reservationList: Reservation[] = [];

    for (const data of result.rows) {

      const selectedRooms = roomsMap.get(data.id);

      // NOTA: Parece tener sentido aqui hacer el chequeo !selectedRooms dado que
      // en la primer consulta se traen todas las reservas de periodo buscado pero 
      // no se distingue por tipo de cuarto en esa instancia.
      // Entonces si el id de la reserva no esta en el Map, es porque la reserva pertenece al periodo pero no al tipo de cuarto.
      if (!selectedRooms) {
        continue;
      }
      reservationList.push(new Reservation(
        data.id,
        data.guest_id,
        data.property_id,
        data.booking_source,
        data.reservation_status,
        data.payment_status,
        data.currency,
        data.check_in,
        data.check_out,
        data.special_request,
        data.created_by,
        data.updated_by,
        data.created_at,
        data.updated_at,
        selectedRooms))
    }

    return reservationList;
  }

  async getByRoomTypeAndDateRange(roomTypeId: number, from: Date, to: Date): Promise<Reservation[]> {

    // LOGICA: Las reservas que confluyen en el rango son las que tienen un check in menor que "hasta"
    // y el check_out mayor que el desde

    const query = `SELECT r.id,
                          r.property_id,
                          r.guest_id,
                          r.check_in,
                          r.check_out,
                          r.special_request,
                          r.subtotal_amount,
                          r.discount_amount,
                          r.tax_amount,
                          r.total_amount,
                          r.required_deposit_amount,
                          r.created_at,
                          r.created_by,
                          r.updated_at,
                          r.updated_by,

                          c.code AS currency,
                          bs.description AS booking_source,
                          rs.description AS reservation_status
                    FROM reservation r
                    INNER JOIN currencies c ON c.id = r.currency_id
                    INNER JOIN booking_source bs ON bs.id = r.booking_source_id
                    INNER JOIN reservation_status rs ON rs.id = r.reservation_status_id
                    WHERE r.check_in < $2
                    AND r.check_out > $1
                    AND rs.is_active_inventory = TRUE;`

    const result = await this.uow.query(query, [from, to]);

    if (result.rows.length === 0) {
      return [];
    }

    // 2. Obtener los id de todas la reservas encontradas.
    const reservationIds = result.rows.map(r => r.id);

    // 3. Obtener los cuartos seleccionados de cada reserva.
    const roomsQuery = `SELECT * FROM reservation_items WHERE reservation_id = ANY($1::bigint[]) AND room_type_id = $2;`;

    const roomsResult = await this.uow.query(roomsQuery, [reservationIds, roomTypeId]);

    // 4. Crear un Map <reservation_id, selectedRooms[]>
    const roomsMap = new Map<number, SelectedRoom[]>();

    for (const row of roomsResult.rows) {
      let rooms = roomsMap.get(row.reservation_id);

      if (!rooms) {
        rooms = [];
        roomsMap.set(row.reservation_id, rooms);
      }

      rooms.push(new SelectedRoom(row.room_type_id, row.quantity));
    }

    // 5. Armar una lista con las entidades reservas.

    const reservationList: Reservation[] = [];

    for (const data of result.rows) {

      const selectedRooms = roomsMap.get(data.id);

      // NOTA: Parece tener sentido aqui hacer el chequeo !selectedRooms dado que
      // en la primer consulta se traen todas las reservas de periodo buscado pero 
      // no se distingue por tipo de cuarto en esa instancia.
      // Entonces si el id de la reserva no esta en el Map, es porque la reserva pertenece al periodo pero no al tipo de cuarto.
      if (!selectedRooms) {
        continue;
      }
      reservationList.push(new Reservation(
        data.id,
        data.guest_id,
        data.property_id,
        data.booking_source,
        data.reservation_status,
        data.payment_status,
        data.currency,
        data.check_in,
        data.check_out,
        data.special_request,
        data.created_by,
        data.updated_by,
        data.created_at,
        data.updated_at,
        selectedRooms))
    }

    return reservationList;
  }

}
